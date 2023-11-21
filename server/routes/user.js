import express from "express";
import {
  generateAccessToken,
  login,
  register,
  verifyToken,
  logout,
} from "../controllers/authCtrl.js";
import {
  profile,
  follow,
  unfollow,
  suggestionsUser,
  getUser,
  searchUsers,
} from "../controllers/userCtrl.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { upload } from "../config/imageupload.js";

const router = express.Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/verify/:token").get(verifyToken);
router.route("/login").post(login);
router.route("/searchUsers").get(isAuthenticated, searchUsers);
router.route("/logout").get(logout);
router.route("/access_token").get(generateAccessToken);

router.route("/user/profile").get(isAuthenticated, profile);
router.route("/user/:id").get(isAuthenticated, getUser);

router.route("/user/:id/follow").put(isAuthenticated, follow);
router.route("/user/:id/unfollow").put(isAuthenticated, unfollow);

router.route("/suggestionsUser").get(isAuthenticated, suggestionsUser);

export default router;
