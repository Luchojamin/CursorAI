import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/task.controller';

const router = Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router; 