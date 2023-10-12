import { NotFoundError } from "../errors/customErrors.js";
import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const profile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ success: "true", user });
};
