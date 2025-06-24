import { PrismaClient, Task } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createTask = async (data: any): Promise<Task> => {
    const { groups, ...taskData } = data;
    const createData = {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null
    };
    return prisma.task.create({ data: createData });
};

export const getAllTasks = async (): Promise<any[]> => {
    return prisma.task.findMany({
        include: {
            groups: {
                include: { group: true }
            }
        }
    });
};

export const getTaskById = async (id: number): Promise<any> => {
    return prisma.task.findUnique({
        where: { id },
        include: {
            groups: {
                include: { group: true }
            }
        }
    });
};

export const updateTask = async (id: number, data: any): Promise<Task | null> => {
    const { groups, ...taskData } = data;
    const updateData = {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined
    };
    return prisma.task.update({ where: { id }, data: updateData });
};

export const deleteTask = async (id: number): Promise<void> => {
    await prisma.taskGroup.deleteMany({ where: { taskId: id } });
    await prisma.task.delete({ where: { id } });
}; 