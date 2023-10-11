import { StatusCodes } from "http-status-codes";
import { createAccessToken, createRefreshToken } from "./tokenUtils.js";

export const sendToken = (user, res) => {
  const refreshToken = createRefreshToken(user);
  const access_token = createAccessToken(user);

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(StatusCodes.OK)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      access_token,
      user,
    });
};
