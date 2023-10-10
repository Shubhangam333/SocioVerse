import express from "express";
import {
  generateAccessToken,
  login,
  register,
  verifyToken,
} from "../controllers/authCtrl.js";
import { upload } from "../config/imageupload.js";

const router = express.Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/register/verify/:token").get(verifyToken);
router.route("/login").post(login);
router.route("/access_token").get(generateAccessToken);

export default router;
