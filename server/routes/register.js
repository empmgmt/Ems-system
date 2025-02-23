import express from "express";
import { registerUser } from "../controllers/registerController.js";

const router = express.Router();
router.post("/", registerUser); // Ensure it is listening for POST requests

export default router;