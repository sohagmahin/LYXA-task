
export type TodoStatus = 'new' | 'ongoing' | 'done';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: Date;
  movedAt: Date;
  dueDate?: Date;
}

export const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  ongoing: 'bg-orange-100 text-orange-800 border-orange-200',
  done: 'bg-green-100 text-green-800 border-green-200'
} as const;

export const STATUS_LABELS = {
  new: 'New',
  ongoing: 'Ongoing', 
  done: 'Done'
} as const;
