import express from "express";
import { createPost, getPosts } from "../controllers/postCtrl.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { postupload } from "../config/imageupload.js";

const router = express.Router();

router
  .route("/createPost")
  .post(isAuthenticated, postupload.array("postimage"), createPost);
router.route("/posts").get(isAuthenticated, getPosts);

export default router;
