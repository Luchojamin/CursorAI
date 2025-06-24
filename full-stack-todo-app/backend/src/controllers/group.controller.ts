import { Request, Response } from 'express';
import * as groupService from '../services/group.service';

export const createGroup = async (req: Request, res: Response) => {
    try {
        const group = await groupService.createGroup(req.body);
        res.status(201).json(group);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllGroups = async (req: Request, res: Response) => {
    try {
        const groups = await groupService.getAllGroups();
        res.status(200).json(groups);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getGroupById = async (req: Request, res: Response) => {
    try {
        const group = await groupService.getGroupById(Number(req.params.id));
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGroup = async (req: Request, res: Response) => {
    try {
        const group = await groupService.updateGroup(Number(req.params.id), req.body);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ message: 'Group not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteGroup = async (req: Request, res: Response) => {
    try {
        await groupService.deleteGroup(Number(req.params.id));
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}; 