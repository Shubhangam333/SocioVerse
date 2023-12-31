import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  createConversation,
  createMessage,
  deleteConversation,
  deleteMessages,
  getConversations,
  getMessages,
} from "../controllers/messageCtrl.js";
import { msgUpload } from "../config/imageupload.js";

const router = express.Router();

router
  .route("/message")
  .post(msgUpload.array("media"), isAuthenticated, createMessage);

router.route("/conversations").get(isAuthenticated, getConversations);

router.route("/create-conversation").post(isAuthenticated, createConversation);

router.route("/message/:id").get(isAuthenticated, getMessages);

router.route("/message/:id").delete(isAuthenticated, deleteMessages);

router.route("/conversation/:id").delete(isAuthenticated, deleteConversation);

export default router;
