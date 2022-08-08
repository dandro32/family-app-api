import { Document, WithId } from "mongodb";

export interface ChatMessageParams {
  name: string;
  message: string;
  date: string;
}

export interface ChatMessage extends ChatMessageParams {
  _id: string;
}

export interface ChatRepository {
  add(message: ChatMessageParams): void;
  findAll(): Promise<WithId<Document>[]>;
}

export default ChatMessage;
