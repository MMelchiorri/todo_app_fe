export type Todo = {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    tags: string[];
    category: string;
    assignedTo: string;
    dueDate?: Date;
    reminder: boolean;
    reminderDate?: Date;
    createdAt: Date;
    priority: string;
};