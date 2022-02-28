import { WithId, Document } from "mongodb";

export interface User {
  id: string;
  name: string;
}

export interface CreateUser extends User {
  password: string;
}

export interface UsersRepository {
  findAll(): Promise<WithId<Document>[]>; // TODO: why document not task?
  findOne(userId: string): Promise<WithId<Document> | null>;
  create(credentials: CreateUser): Promise<void>;
}
