import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { Post } from "../models/post.js";
import { APIfeatures } from "../apifeatures/apiFeature.js";
import { User } from "../models/user.js";

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

export const getPostById = async (req, res, next) => {
  const id = req.params.id;

  const post = await Post.findById(id);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  res.status(StatusCodes.OK).json({ post });
};

export const getPosts = async (req, res, next) => {
  const features = new APIfeatures(
    Post.find({
      user: [...req.user.following, req.user._id],
    }),
    req.query
  ).paginating();

  const posts = await features.query
    .sort("-createdAt")
    .populate("user likes", "avatar name followers")
    .populate({
      path: "comments",
      populate: {
        path: "user likes",
        select: "-password",
      },
    });

  res.status(StatusCodes.OK).json({ success: true, posts });
};

export const likePost = async (req, res, next) => {
  const post = await Post.find({
    _id: req.params.id,
    likes: req.user._id,
  });
  if (post.length > 0)
    return res
      .status(StatusCodes.OK)
      .json({ msg: "You liked this post already." });

  const like = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  );

  if (!like)
    throw new BadRequestError("There was an error while updating the like");

  res.status(StatusCodes.OK).json({ msg: "User Liked this Post" });
};
export const unlikePost = async (req, res, next) => {
  const like = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  );

  if (!like)
    throw new BadRequestError("There was an error while updating the like");

  res.status(StatusCodes.OK).json({ msg: "User UnLiked this Post" });
};
export const getUserPosts = async (req, res, next) => {
  const features = new APIfeatures(
    Post.find({ user: req.params.id }),
    req.query
  ).paginating();

  const userposts = await features.query.sort("-createdAt");
  if (!userposts) {
    throw new NotFoundError("Posts Not found");
  }

  res.status(StatusCodes.OK).json({
    userposts,
  });
};
export const savePost = async (req, res, next) => {
  const user = await Post.find({
    _id: req.params.id,
    saved: req.user._id,
  });
  if (user.length > 0)
    res.status(StatusCodes.OK).json({ msg: "You saved this post already." });

  const save = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { saved: req.user._id },
    },
    { new: true }
  );

  if (!save) {
    throw new BadRequestError("This User does not exist");
  }

  res.status(StatusCodes.OK).json({ msg: "Saved Post!" });
};
export const unSavePost = async (req, res, next) => {
  const save = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { saved: req.user._id },
    },
    { new: true }
  );
  if (!save) {
    throw new BadRequestError("This User does not exist");
  }

  res.status(StatusCodes.OK).json({ msg: "UnSaved Post!" });
};
export const getSavePosts = async (req, res, next) => {
  const features = new APIfeatures(
    Post.find({
      _id: { $in: req.user.saved },
    }),
    req.query
  ).paginating();

  const savePosts = await features.query.sort("-createdAt");

  res.status(StatusCodes.OK).json({
    savePosts,
    result: savePosts.length,
  });
};
export const deletePost = async (req, res, next) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!post) {
    throw new NotFoundError("Post does not exist");
  }
  await Comments.deleteMany({ _id: { $in: post.comments } });

  res.status(StatusCodes.OK).json({
    msg: "Post Deleted",
  });
};
