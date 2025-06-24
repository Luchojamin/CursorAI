import { PrismaClient, Group } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createGroup = async (data: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>): Promise<Group> => {
    return prisma.group.create({ data });
};

export const getAllGroups = async (): Promise<Group[]> => {
    return prisma.group.findMany();
};

export const getGroupById = async (id: number): Promise<Group | null> => {
    return prisma.group.findUnique({ where: { id } });
};

export const updateGroup = async (id: number, data: Partial<Omit<Group, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Group | null> => {
    return prisma.group.update({ where: { id }, data });
};

export const deleteGroup = async (id: number): Promise<void> => {
    const relatedTasks = await prisma.taskGroup.count({ where: { groupId: id } });
    if (relatedTasks > 0) {
        throw new Error('Cannot delete group: it has tasks assigned.');
    }
    await prisma.group.delete({ where: { id } });
}; 