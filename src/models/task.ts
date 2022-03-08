import { DeleteResult, WithId, Document } from "mongodb";

interface CreateTaskParams {
  title: string;
  username: string;
  listId: string;
}

interface Task extends CreateTaskParams {
  _id: string;
  done: boolean;
}

export interface TaskRepository {
  create(list: CreateTaskParams): Promise<void>;
  findAll(listId: string): Promise<WithId<Document>[]>; // TODO: why document not task?
  remove(taskId: string): Promise<DeleteResult>;
  update(list: Task): Promise<void>;
}

export default Task;
