import { Db } from "mongodb";
import { ChatRepository } from "../../models/chat";

const chatRepositoryFactory = (db: Db): ChatRepository => {
  const messages = db.collection("chat");

  return {
    async add(message) {
      await messages.insertOne(message);
    },
    async findAll() {
      return messages.find().toArray();
    },
  };
};

export default chatRepositoryFactory;
