import express from "express";
import {
  createPost,
  getPosts,
  getSavePosts,
  getUserPosts,
  likePost,
  savePost,
  unSavePost,
  unlikePost,
  getPostById,
} from "../controllers/postCtrl.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { postupload } from "../config/imageupload.js";

const router = express.Router();

router
  .route("/createpost")
  .post(isAuthenticated, postupload.array("postimage"), createPost);
router.route("/posts").get(isAuthenticated, getPosts);
router.route("/post/:id").get(isAuthenticated, getPostById);

router.route("/post/:id/like").put(isAuthenticated, likePost);
router.route("/post/:id/unlike").put(isAuthenticated, unlikePost);

router.route("/user_posts/:id").get(isAuthenticated, getUserPosts);

router.route("/savePost/:id").get(isAuthenticated, savePost);
router.route("/unSavePost/:id").get(isAuthenticated, unSavePost);
router.route("/getSavePosts").get(isAuthenticated, getSavePosts);

export default router;
