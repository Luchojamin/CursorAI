import { Router } from 'express';
import { assignGroupToTask, unassignGroupFromTask } from '../controllers/taskGroup.controller';

const router = Router();

router.post('/:taskId/groups/:groupId', assignGroupToTask);
router.delete('/:taskId/groups/:groupId', unassignGroupFromTask);

export default router; 