import express from 'express';
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  updatePost,
} from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);
postRouter.patch('/:id/likePost/', likePost);
postRouter.patch('/:id', updatePost);

export default postRouter;
