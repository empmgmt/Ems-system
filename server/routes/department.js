import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', authMiddleware, getDepartments); // ✅ Fetch all departments
router.post('/add', authMiddleware, addDepartment); // ✅ Add a new department
router.get('/:id', authMiddleware, getDepartment); // ✅ Fetch department by ID
router.put('/:id', authMiddleware, updateDepartment); // ✅ Update department
router.delete('/:id', authMiddleware, deleteDepartment); // ✅ Delete department

export default router;
