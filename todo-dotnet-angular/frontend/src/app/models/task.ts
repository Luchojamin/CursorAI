import { Group } from './group';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  groups: Group[];
}
