import jwt from "jsonwebtoken";

export const createRefreshToken = function (payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const createAccessToken = function (payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};
