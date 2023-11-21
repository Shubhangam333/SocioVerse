import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";
import { StatusCodes } from "http-status-codes";

export const createComment = async (req, res, next) => {
  const { postId, content, tag, reply, postUserId } = req.body;
  const post = await Post.findById(postId);
  if (!post) {
    throw new NotFoundError("This post does not exist ");
  }

  if (reply) {
    const cm = await Comment.findById(reply);
    if (!cm) {
      throw new NotFoundError("This comment does not exist.");
    }

    await Comment.findOneAndUpdate(
      {
        _id: reply,
        user: req.user._id,
      },
      { replyCount: cm.replyCount + 1 }
    );
  }

  const newComment = await Comment.create({
    user: req.user._id,
    content,
    tag,
    reply,
    postUserId,
    postId,
  });

  if (!newComment) {
    throw new BadRequestError("There was an error while creating the comment");
  }
  await Post.findOneAndUpdate(
    { _id: postId },
    {
      $push: { comments: newComment._id },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ newComment });
};
export const updateComment = async (req, res, next) => {
  const { content } = req.body;

  await Comment.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    { content }
  );

  res.status(StatusCodes.OK).json({ msg: "Update Success!" });
};
export const likeComment = async (req, res, next) => {
  const comment = await Comment.find({
    _id: req.params.id,
    likes: req.user._id,
  });
  if (comment.length > 0)
    return res
      .status(StatusCodes.OK)
      .json({ msg: "You already liked this post" });

  await Comment.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ msg: "You Liked this Comment!" });
};
export const unLikeComment = async (req, res, next) => {
  await Comment.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  );

  res.json({ msg: "You Unliked this Comment!" });
};
export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findOneAndDelete({
    _id: req.params.id,
    $or: [{ user: req.user._id }, { postUserId: req.user._id }],
  });
  await Post.findOneAndUpdate(
    { _id: comment.postId },
    {
      $pull: { comments: req.params.id },
    }
  );

  res.status(StatusCodes.OK).json({ msg: "You Deleted this Comment!" });
};
