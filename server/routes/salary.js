import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  addSalary,
  getSalary,
  getDepartmentSalarySummary,
  getSalariesByDepartment
} from '../controllers/salaryController.js';

const salary = express.Router();

// Add salary
salary.post('/add', authMiddleware, addSalary);

// Get salary by employee ID
salary.get('/:id', authMiddleware, getSalary);

// Department-wise salary summary
salary.get('/', authMiddleware, getDepartmentSalarySummary);

// Get salaries by department name
salary.get('/department/:departmentName', authMiddleware, getSalariesByDepartment);

export default salary;
