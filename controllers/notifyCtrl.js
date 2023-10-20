import { StatusCodes } from "http-status-codes";
import { notify } from "../models/notify.js";
import { BadRequestError } from "../errors/customErrors.js";

export const createNotify = async (req, res, next) => {
  const { recipients, url, text, content, image } = req.body;

  if (recipients.includes(req.user._id.toString())) return;

  const notifies = await notify.create({
    recipients,
    url,
    text,
    content,
    image,
    user: req.user._id,
  });

  if (!notifies) {
    throw new BadRequestError(
      "There was an error while processing your request"
    );
  }

  res.status(StatusCodes.OK).json({ notifies });
};
export const removeNotify = async (req, res, next) => {
  const notify = await notify.findOneAndDelete({
    id: req.params.id,
    url: req.query.url,
  });

  if (!notify) {
    throw new BadRequestError(
      "There was an error while processing your request"
    );
  }

  res.status(StatusCodes.OK).json({ notify });
};

export const getNotifies = async (req, res, next) => {
  const notifies = await notify
    .find({ recipients: req.user._id })
    .sort("-createdAt")
    .populate("user", "avatar name");

  if (!notifies) {
    throw new BadRequestError(
      "There was an error while processing your request"
    );
  }

  res.status(StatusCodes.OK).json({ notifies });
};
export const isReadNotify = async (req, res, next) => {
  const notifies = await notify.findOneAndUpdate(
    { _id: req.params.id },
    {
      isRead: true,
    }
  );

  if (!notifies) {
    throw new BadRequestError(
      "There was an error while processing your request"
    );
  }

  res.status(StatusCodes.OK).json({ notifies });
};
export const deleteAllNotifies = async (req, res, next) => {
  const notifies = await notify.deleteMany({
    recipients: req.user._id,
  });

  if (!notifies) {
    throw new BadRequestError(
      "There was an error while processing your request"
    );
  }

  res.status(StatusCodes.OK).json({ notifies });
};
