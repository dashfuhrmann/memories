import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import storage from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import dotenv from 'dotenv';

dotenv.config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const { Storage } = storage;

const gc = new Storage();

const imageBucket = gc.bucket(BUCKET_NAME);

const uploadFileToGCS = (fileData, fileToUpdate) => {
  return new Promise((resolve, reject) => {
    const image = fileData;

    const base64EncodedString = image.replace(/^data:\w+\/\w+;base64,/, '');

    const fileBuffer = Buffer.from(base64EncodedString, 'base64');

    const file = imageBucket.file(`${fileToUpdate}`);
    const fileFullSize = imageBucket.file(`xl-${fileToUpdate}`);

    sharp(fileBuffer)
      .withMetadata()
      .resize(500, 250)
      .toBuffer()
      .then((data) => {
        if (data) {
          file.save(
            data,
            {
              resumable: false,
              gzip: true,
              metadata: { cacheControl: 'public, max-age=0' },
            },
            function (err) {
              if (!err) {
                resolve('Stuff worked');
              } else {
                reject(err);
              }
            }
          );
        }
      })
      .catch((err) => {
        reject(err.message);
      });

    sharp(fileBuffer)
      .withMetadata()
      .toBuffer()
      .then((data) => {
        if (data) {
          fileFullSize.save(data, {
            resumable: false,
            gzip: true,
            metadata: { cacheControl: 'public, max-age=0' },
          });
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

function deleteFile(fileToDelete) {
  const file = imageBucket.file(fileToDelete);
  const file_xl = imageBucket.file(`xl-${fileToDelete}`);

  return new Promise(function (resolve, reject) {
    file.delete(function (err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });

    file_xl.delete(function (err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

export const getPosts = async (req, res) => {
  const { page, searchterm } = req.params;

  let postMessages;
  let total;

  const pageSize = 6;

  if (searchterm !== 'undefined') {
    postMessages = await PostMessage.find({
      $or: [
        { title: { $regex: searchterm, $options: 'i' } },
        { tags: searchterm },
      ],
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({ _id: -1 });

    total = await PostMessage.countDocuments({
      $or: [
        { title: { $regex: searchterm, $options: 'i' } },
        { tags: searchterm },
      ],
    });
  } else {
    postMessages = await PostMessage.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({ _id: -1 });

    total = await PostMessage.countDocuments();
  }

  try {
    res.status(200).json({
      posts: postMessages,
      metadata: { total, pages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    res.status(404).json({ message: error.message, data: error.data });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const { title, message, tags, uploadFile } = req.body;

  if (!title || !message || !tags || !uploadFile) {
    return res
      .status(400)
      .json({ message: 'Please enter all fields and upload a file' });
  }

  const fileName = `${uuidv4()}.png`;

  const timeStamp = new Date().getTime();

  await uploadFileToGCS(post.uploadFile, fileName)
    .then(() => {
      const newPost = new PostMessage({
        ...post,
        selectedFile: `${fileName}?timestamp=${timeStamp}`,
      });

      newPost.save();

      res.status(201).json(newPost);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  const selectedFileNoTimestamp = post.selectedFile.split('?', 2)[0];

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');

  if (post.uploadFile) {
    await uploadFileToGCS(post.uploadFile, selectedFileNoTimestamp)
      .then(() => {
        const timeStamp = new Date().getTime();

        const postCopy = {
          ...post,
          selectedFile: `${selectedFileNoTimestamp}?timestamp=${timeStamp}`,
        };

        PostMessage.findByIdAndUpdate(
          _id,
          { ...postCopy, _id },
          {
            new: true,
          },
          function (err, doc) {
            if (!err) {
              res.json(doc);
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      },
      function (err, doc) {
        if (!err) {
          res.json(doc);
        }
      }
    );
  }
};

export const likePost = async (req, res) => {
  const { id, userId, option } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(id);
  let updatedPost;

  if (option === '1') {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
        likeUserIds: [...post.likeUserIds, userId],
      },
      { new: true }
    );
  }

  if (option === '0') {
    const removedId = post.likeUserIds.filter((likeId) => likeId !== userId);

    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount - 1,
        likeUserIds: removedId,
      },
      { new: true }
    );
  }

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(id);

  const selectedFileNoTimestamp = post.selectedFile.split('?', 2)[0];

  await deleteFile(selectedFileNoTimestamp);

  await PostMessage.findByIdAndRemove(id)
    .then(() => {
      res.json({ message: 'Post deleted successfully' });
    })
    .catch((err) => {
      res.status(409).json({ message: err.message, data: err.data });
    });
};
