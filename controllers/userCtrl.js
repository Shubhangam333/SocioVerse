import { NotFoundError } from "../errors/customErrors.js";
import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const profile = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate(
    "followers following",
    "avatar name followers following"
  );

  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ success: "true", user });
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("followers following", "-password");
  if (!user) throw NotFoundError("User does not exist");

  res.status(StatusCodes.OK).json({ user });
};

export const follow = async (req, res, next) => {
  const user = await User.find({ _id: req.params.id, followers: req.user._id });

  if (user.length > 0) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "You followed this User" });
  }

  const newUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  ).populate("followers following", "-password");

  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: { following: req.params.id },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ msg: "You followed this user", newUser });
};

export const unfollow = async (req, res, next) => {
  const newUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  ).populate("followers following", "-password");

  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { following: req.params.id },
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ msg: "You Unfollowed this user", newUser });
};
export const suggestionsUser = async (req, res, next) => {
  const newArr = [req.user._id];

  const num = req.query.num || 10;

  const users = await User.aggregate([
    { $match: { _id: { $nin: newArr } } },
    { $sample: { size: Number(num) } },
    {
      $lookup: {
        from: "user",
        localField: "followers",
        foreignField: "_id",
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "following",
        foreignField: "_id",
        as: "following",
      },
    },
  ]).project("-password");

  res.status(StatusCodes.OK).json({
    users,
    result: users.length,
  });
};

export const searchUsers = async (req, res, next) => {
  if (req.query.name === "") {
    res.status(StatusCodes.OK).json({});
  }

  const users = await User.find({
    name: { $regex: new RegExp(req.query.name, "i") },
  })
    .limit(5)
    .select("name avatar");

  if (!users) {
    throw new NotFoundError("No users found");
  }

  res.status(StatusCodes.OK).json({ users });
};
