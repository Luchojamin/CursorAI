export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate?: Date;
    completed: boolean;
    groups: Group[];
}

export interface Group {
    id: number;
    name: string;
} 