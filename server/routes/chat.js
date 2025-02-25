import express from "express";
import { getMessages, sendMessage, clearMessages } from "../controllers/chatController.js";

const router = express.Router();

router.route("/:senderId").get(getMessages).post(sendMessage);
router.delete("/clear", clearMessages);

export default router;
