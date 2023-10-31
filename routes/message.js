import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  createMessage,
  deleteConversation,
  deleteMessages,
  getConversations,
  getMessages,
} from "../controllers/messageCtrl.js";

const router = express.Router();

router.route("/message").post(isAuthenticated, createMessage);

router.route("/conversations").get(isAuthenticated, getConversations);

router.route("/message/:id").get(isAuthenticated, getMessages);

router.route("/message/:id").put(isAuthenticated, deleteMessages);

router.route("/conversation/:id").put(isAuthenticated, deleteConversation);

export default router;
