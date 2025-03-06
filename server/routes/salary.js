import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addSalary, getSalary } from '../controllers/salaryController.js';

const salary = express.Router();

// POST route to add salary
salary.post('/add', authMiddleware, addSalary);

// GET route to get salary by employee ID
salary.get('/:id', authMiddleware, getSalary);

export default salary;
