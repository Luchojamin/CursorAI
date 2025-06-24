import { PrismaClient, TaskGroup } from '../../generated/prisma';

const prisma = new PrismaClient();

export const assignGroupToTask = async (taskId: number, groupId: number): Promise<TaskGroup> => {
    return prisma.taskGroup.create({
        data: {
            taskId,
            groupId,
        },
    });
};

export const unassignGroupFromTask = async (taskId: number, groupId: number): Promise<void> => {
    await prisma.taskGroup.delete({
        where: {
            taskId_groupId: {
                taskId,
                groupId,
            },
        },
    });
};

export const unassignAllGroupsFromTask = async (taskId: number): Promise<void> => {
    await prisma.taskGroup.deleteMany({ where: { taskId } });
}; 