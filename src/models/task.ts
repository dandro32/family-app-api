import { DeleteResult, WithId, Document } from "mongodb";

export interface CreateTaskParams {
  listId: string;
  title: string;
  username: string;
  done: number;
}

export interface Task extends CreateTaskParams {
  _id: string;
}

export interface TaskRepository {
  create(list: CreateTaskParams): Promise<void>;
  findAll(listId: string): Promise<WithId<Document>[]>; // TODO: why document not task?
  markAsDone(taskId: string): Promise<void>;
  remove(taskId: string): Promise<DeleteResult>;
  update(list: Task): Promise<void>;
}

export default Task;
