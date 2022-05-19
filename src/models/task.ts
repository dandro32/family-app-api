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

export type DoneStatus = 0 | 1;

export interface MarkAsDone {
  status: DoneStatus;
}

export interface TaskRepository {
  create(list: CreateTaskParams): Promise<Document>;
  findAll(listId: string): Promise<WithId<Document>[]>; // TODO: why document not task?
  markAsDone(taskId: string, status: DoneStatus): Promise<void>;
  remove(taskId: string): Promise<DeleteResult>;
  removeAll(listId: string): Promise<DeleteResult>;
  update(list: Task): Promise<void>;
}

export default Task;
