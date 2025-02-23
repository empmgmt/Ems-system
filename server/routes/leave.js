import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  updateLeaveStatus,
  updateLeave,
  getEmployeeLeaves
} from "../controllers/leaveController.js";

const leaveRouter = express.Router();

leaveRouter.post("/add", authMiddleware, addLeave);
leaveRouter.get("/", authMiddleware, getLeaves);
leaveRouter.get("/:id", authMiddleware, getLeave);
leaveRouter.get("/employee/:id", authMiddleware, getEmployeeLeaves); // ✅ New route
leaveRouter.put("/:id", authMiddleware, updateLeave);
leaveRouter.put("/:id/status", authMiddleware, updateLeaveStatus);

export default leaveRouter;
