import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { sendVerificationEmail } from "../middlewares/verficationmiddleware.js";
import { User } from "../models/user.js";
import { generateVerificationToken } from "../utils/generateverificationtoken.js";
import { StatusCodes } from "http-status-codes";
import { sendToken } from "../utils/sendToken.js";
import { createAccessToken } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { name, email, password, gender, dob } = req.body;

  if (!name || !email || !password || !gender || !dob) {
    throw new Error("Please enter the required details");
  }

  if (!req.file) {
    throw new Error("Please provide your profile picture");
  }

  if (await User.findOne({ email })) {
    throw new UnauthorizedError("Email Already Exist");
  }

  const verificationToken = generateVerificationToken();

  const user = await User.create({
    name,
    email,
    password,
    gender,
    dob,
    verificationToken,
    avatar: {
      public_id: req.file.filename,
      url: req.file.path,
    },
  });

  if (user) {
    sendVerificationEmail(user);
  }
  res.status(200).json({
    success: true,
    message:
      "Registration successful, Please check your email and activate your account",
  });
};

export const verifyToken = async (req, res, next) => {
  const token = req.params.token;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User does not exist" });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(StatusCodes.OK).json({ message: "Email verified successfully." });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    throw new BadRequestError("Please provide valid email and password");
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate(
      "followers following",
      "avatar username fullname followers following"
    );

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    throw new UnauthorizedError("Invalid Email or Password");
  }
  if (!user.isVerified) {
    throw new UnauthenticatedError("Your account has not been verified");
  }

  sendToken(user, res);
};

export const logout = async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.status(StatusCodes.OK).cookie("refreshToken", null, options).json({
    success: true,
    message: "Logout Successfuly",
  });
};

export const generateAccessToken = async (req, res, next) => {
  const rf_token = req.cookies.refreshToken;
  if (!rf_token) throw new UnauthorizedError("Please Login Now");

  const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);

  if (!result) throw new UnauthorizedError("Please Login Now");
  const user = await User.findById(result.id).select("-password");

  if (!user) throw new UnauthorizedError("User does not exist");

  const access_token = createAccessToken({ id: result.id });

  res.status(StatusCodes.OK).json({
    access_token,
    user,
  });
};
