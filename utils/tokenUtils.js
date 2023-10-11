import jwt from "jsonwebtoken";

export const createRefreshToken = function (user) {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const createAccessToken = function (user) {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};
