import { User } from "../models/user.js";

export const profile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(StatusCodes.OK).json({ success: "true", user });
};
