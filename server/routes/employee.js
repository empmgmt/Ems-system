import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { 
  addEmployee, 
  upload, 
  deleteEmployee,
  getAllEmployees, 
  getEmployeeById, 
  fetchEmployeesByDepId, 
  updateEmployee 

} from '../controllers/employeeController.js';

const router = express.Router();
router.get('/', authMiddleware, getAllEmployees);
router.post('/add', authMiddleware, upload.single('image'), addEmployee);
router.get('/:id', authMiddleware, getEmployeeById);
router.put('/:id', authMiddleware, updateEmployee);
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId);
router.delete('/:id', authMiddleware, deleteEmployee); 
export default router;
