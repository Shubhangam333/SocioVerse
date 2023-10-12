import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) throw new UnauthorizedError("Token does not exist");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded.id) throw new UnauthorizedError("Token expired");

  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    throw new NotFoundError("User does not exist in the system");
  }

  req.user = user;
  next();
};
