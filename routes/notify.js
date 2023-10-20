import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  createNotify,
  deleteAllNotifies,
  getNotifies,
  isReadNotify,
  removeNotify,
} from "../controllers/notifyCtrl.js";

const router = express.Router();

router.route("/notify").post(isAuthenticated, createNotify);
router.route("/notify/:id").delete(isAuthenticated, removeNotify);
router.route("/notifies").get(isAuthenticated, getNotifies);
router.route("/isReadNotify/:id").put(isAuthenticated, isReadNotify);
router.route("/deleteAllNotify").delete(isAuthenticated, deleteAllNotifies);

export default router;
