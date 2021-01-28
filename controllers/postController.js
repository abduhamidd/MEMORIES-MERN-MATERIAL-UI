import PostsDatabase from '../models/postModel.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await PostsDatabase.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { creator, title, tags, selectedFile, message } = req.body;

  try {
    const newPost = new PostsDatabase({
      creator,
      title,
      tags,
      selectedFile,
      message,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id ${id}`);
  await PostsDatabase.findByIdAndRemove(id);
  res.send('post deleted succesfully');
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  try {
    const post = await PostsDatabase.findById(id);
    const likedPost = await PostsDatabase.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true },
    );
    res.json(likedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostsDatabase.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};
