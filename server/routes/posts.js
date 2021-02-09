import express from 'express';
import auth from '../middleware/auth.js';
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/:page/:searchterm', getPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/:userId/:option/likePost', auth, likePost);

export default router;
