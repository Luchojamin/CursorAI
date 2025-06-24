import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import * as taskGroupService from '../services/taskGroup.service';

export const createTask = async (req: Request, res: Response) => {
    debugger;
    try {
        const task = await taskService.createTask(req.body);
        // Assign group if provided
        if (req.body.groups && req.body.groups.length > 0) {
            const groupId = req.body.groups[0].id || req.body.groups[0];
            await taskGroupService.assignGroupToTask(task.id, groupId);
        }
        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    debugger;
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await taskService.getTaskById(Number(req.params.id));
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await taskService.updateTask(Number(req.params.id), req.body);
        if (task) {
            // Remove previous group assignments and assign new group if provided
            if (req.body.groups && req.body.groups.length > 0) {
                const groupId = req.body.groups[0].id || req.body.groups[0];
                // Remove all previous assignments
                await taskGroupService.unassignAllGroupsFromTask(task.id);
                await taskGroupService.assignGroupToTask(task.id, groupId);
            }
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        await taskService.deleteTask(Number(req.params.id));
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}; 