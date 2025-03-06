import express from "express";
import { getNotifications } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/:employeeId", async (req, res) => {
  console.log("📡 Received request for notifications with params:", req.params);
  if (!req.params || !req.params.employeeId) {
    return res.status(400).json({ success: false, error: "Employee ID is missing in request" });
  }
  await getNotifications(req, res);
});

export default notificationRouter;
