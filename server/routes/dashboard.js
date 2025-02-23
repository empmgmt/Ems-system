import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const { getSummary, getLeaveDetails } = dashboardController;

const router = express.Router();

// Route for fetching dashboard summary
router.get('/summary', authMiddleware, getSummary);

// Route for fetching detailed leave breakdown
router.get('/leave-details', authMiddleware, getLeaveDetails);

export default router;
