import { DeleteResult, WithId, Document } from "mongodb";

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
  findAll(categoryId: string): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(taskId: string): Promise<WithId<Document> | null>;
  remove(taskId: string): Promise<DeleteResult>;
  update(task: Task): Promise<void>;
}
