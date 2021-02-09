import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import Filebase from 'react-file-base64';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  InputAdornment,
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { Alert } from '@material-ui/lab';
import { clearErrors } from '../../actions/errors';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    uploadFile: '',
    msg: null,
  });

  const [isLoading, setisLoading] = useState(false);

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const userId = useSelector((state) => state.auth.user._id);
  const creator = useSelector((state) => state.auth.user.name);

  const error = useSelector((state) => state.error);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    if (error.id === 'CREATE_POST_FAIL') {
      setisLoading(false);
      setPostData({ ...postData, msg: error.msg.message });
    } else {
      setPostData({ ...postData, msg: null });
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
      clear();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(clearErrors());

    const { title, message, tags, selectedFile, uploadFile } = postData;

    const updatedPost = {
      title,
      message,
      tags,
      selectedFile,
      uploadFile,
      creator,
      userId,
    };

    if (currentId) {
      dispatch(updatePost(currentId, updatedPost));
    } else {
      setisLoading(true);
      dispatch(createPost(updatedPost));
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
      uploadFile: '',
      msg: null,
    });
  };

  return (
    <Card className={`${classes.card} ${isLoading ? classes.filter : null}`}>
      {isLoading ? (
        <CircularProgress className={classes.progress}></CircularProgress>
      ) : null}

      {postData.uploadFile ? (
        <CardMedia
          className={classes.media}
          image={postData.uploadFile}
        ></CardMedia>
      ) : null}

      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div>
          {postData.msg ? (
            <Alert className={classes.mt_10} severity="error">
              {postData.msg}
            </Alert>
          ) : null}
        </div>
        <Typography variant="h6" className={classes.header}>
          {!currentId ? 'Creating' : 'Editing'} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip arrow title="Seperate multiple tags with semicolons">
                  <HelpOutlineIcon></HelpOutlineIcon>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(',') });
          }}
        ></TextField>
        <div className={classes.fileInput}>
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, uploadFile: base64 })
            }
          ></Filebase>
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          Submit
        </Button>
        <Button
          className={classes.buttonClear}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          disabled={isLoading}
        >
          Clear
        </Button>
      </form>
    </Card>
  );
};

export default Form;
