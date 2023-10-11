import { UnauthorizedError } from "../errors/customErrors.js";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) throw new UnauthorizedError("Token does not exist");

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) throw new UnauthorizedError("Token expired");

  const user = await User.findOne({ _id: decoded.id });

  req.user = user;
  next();
};
