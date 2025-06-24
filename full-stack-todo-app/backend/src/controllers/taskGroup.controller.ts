import { Request, Response } from 'express';
import * as taskGroupService from '../services/taskGroup.service';

export const assignGroupToTask = async (req: Request, res: Response) => {
    try {
        const { taskId, groupId } = req.params;
        const taskGroup = await taskGroupService.assignGroupToTask(Number(taskId), Number(groupId));
        res.status(201).json(taskGroup);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const unassignGroupFromTask = async (req: Request, res: Response) => {
    try {
        const { taskId, groupId } = req.params;
        await taskGroupService.unassignGroupFromTask(Number(taskId), Number(groupId));
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}; 