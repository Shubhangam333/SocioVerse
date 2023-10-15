import express from "express";
import {
  generateAccessToken,
  login,
  register,
  verifyToken,
  logout,
} from "../controllers/authCtrl.js";
import { profile } from "../controllers/userCtrl.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { upload } from "../config/imageupload.js";

const router = express.Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/verify/:token").get(verifyToken);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/access_token").get(generateAccessToken);

router.route("/user/profile").get(isAuthenticated, profile);

export default router;
