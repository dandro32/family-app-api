import { DeleteResult, WithId, Document, ObjectId } from "mongodb";
import Task from "./task";

export interface CreateListParams {
  title: string;
  done: number;
}

export interface List extends CreateListParams {
  _id: string;
  tasks: Task[];
}

export interface ListRepository {
  create(list: CreateListParams): Promise<Document>;
  getAllIds(): Promise<ObjectId[]>; // TODO: why document not task?
  findOne(listId: string): Promise<WithId<Document> | null>;
  remove(listId: string): Promise<DeleteResult>;
  update(list: List): Promise<void>;
  markAsDone(listId: string): Promise<void>;
}

export default List;
