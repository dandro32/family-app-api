import { DeleteResult, ObjectId, WithId, Document } from "mongodb";

export interface Task  {
  categoryId: string;
  createDate: Date;
  creator: string;
  id: string;
  name: string;
  owner: string;
  read: boolean;
}

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findAll(categoryId: string): Promise<Task[]>;
  findOne(taskId: string): Promise<Task | null>;
  remove(taskId: string): Promise<DeleteResult>;
  update(task: Task): Promise<void>;
}
