import { DeleteResult, WithId, Document } from "mongodb";

export interface CreateListParams {
  title: string;
  tasks: string[];
  done: number;
}

export interface List extends CreateListParams {
  _id: string;
}

export interface ListRepository {
  create(list: CreateListParams): Promise<void>;
  findAll(listId: string): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(listId: string): Promise<WithId<Document> | null>;
  remove(listId: string): Promise<DeleteResult>;
  update(list: List): Promise<void>;
  markAsDone(listId: string): Promise<void>;
}

export default List;
