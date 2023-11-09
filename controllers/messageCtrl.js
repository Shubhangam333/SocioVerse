import { conversation } from "../models/conversation.js";
import { message } from "../models/message.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";
import { APIfeatures } from "../apifeatures/apiFeature.js";

export const createMessage = async (req, res, next) => {
  const { sender, recipient, text, call } = req.body;

  if (!recipient || !text.trim()) {
    throw new BadRequestError("Invalid Details");
  }

  let mediaLinks = [];

  console.log(req.files);

  if (req.files) {
    mediaLinks = [];
    let mediaFiles = req.files;

    for (let i = 0; i < mediaFiles.length; i++) {
      mediaLinks.push({
        public_id: mediaFiles[i].filename,
        url: mediaFiles[i].path,
      });
    }
  }
  console.log(mediaLinks);
  const newConversation = await conversation.findOneAndUpdate(
    {
      $or: [
        { recipients: [sender, recipient] },
        { recipients: [recipient, sender] },
      ],
    },
    {
      recipients: [sender, recipient],
      text,
      media: mediaLinks,
    },
    { new: true, upsert: true }
  );

  const newMessage = await message.create({
    conversation: newConversation._id,
    sender,
    recipient,
    text,
    media: mediaLinks,
  });
  if (!newMessage) {
    throw new BadRequestError("There was an error in performing your request");
  }

  res.status(StatusCodes.CREATED).json({ msg: "message created " });
};

export const getConversations = async (req, res, next) => {
  const features = new APIfeatures(
    conversation.find({
      recipients: req.user._id,
    }),
    req.query
  ).paginating();

  const conversations = await features.query
    .sort("-updatedAt")
    .populate("recipients", "avatar name");

  if (!conversations) {
    throw new NotFoundError("There was an error in performing your request");
  }

  res.status(StatusCodes.OK).json({
    conversations,
    result: conversations.length,
  });
};

export const getMessages = async (req, res, next) => {
  const features = new APIfeatures(
    message.find({
      $or: [
        { sender: req.user._id, recipient: req.params.id },
        { sender: req.params.id, recipient: req.user._id },
      ],
    }),
    req.query
  ).paginating();

  const messages = await features.query.sort("-createdAt");

  if (!messages) {
    throw new NotFoundError("There was an error in performing your request");
  }

  res.status(StatusCodes.OK).json({
    messages,
    result: messages.length,
  });
};
export const deleteMessages = async (req, res, next) => {
  await message.findOneAndDelete({
    _id: req.params.id,
    sender: req.user._id,
  });
  res.json({ msg: "Delete Success!" });
};

export const deleteConversation = async (req, res, next) => {
  const newConver = await conversation.findOneAndDelete({
    $or: [
      { recipients: [req.user._id, req.params.id] },
      { recipients: [req.params.id, req.user._id] },
    ],
  });

  if (!newConver) {
    throw new NotFoundError("There was an error in performing your request");
  }
  await message.deleteMany({ conversation: newConver._id });

  res.status(StatusCodes.OK).json({ msg: "Delete Success!" });
};
