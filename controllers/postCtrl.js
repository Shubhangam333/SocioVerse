import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import { Post } from "../models/post.js";

export const createPost = async (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    throw new BadRequestError("Content is required");
  }

  let imagesLinks = [];

  if (req.files) {
    imagesLinks = [];
    let images = req.files;

    for (let i = 0; i < images.length; i++) {
      imagesLinks.push({
        public_id: images[i].filename,
        url: images[i].path,
      });
    }
  }

  const post = await Post.create({
    content,
    images: imagesLinks,
    user: req.user._id,
  });

  if (!post) {
    throw new BadRequestError("Post creation unsuccessfull ");
  }
  res.status(StatusCodes.CREATED).json({ success: true, post });
};

export const getPosts = async (req, res, next) => {
  const posts = await Post.find({});

  res.status(StatusCodes.OK).json({ success: true, posts });
};
