import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  createComment,
  deleteComment,
  likeComment,
  unLikeComment,
  updateComment,
} from "../controllers/commentCtrl.js";

const router = express.Router();

router.route("/comment").post(isAuthenticated, createComment);
router.route("/comment/:id").put(isAuthenticated, updateComment);
router.route("/comment/:id/like").put(isAuthenticated, likeComment);
router.route("/comment/:id/unlike").put(isAuthenticated, unLikeComment);
router.route("/comment/:id").delete(isAuthenticated, deleteComment);

export default router;
