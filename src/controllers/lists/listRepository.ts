import { Db } from "mongodb";
import { ListRepository } from "../../models/list";

const listRepositoryFactory = (db: Db): ListRepository => {
  const lists = db.collection("lists");

  return {
    async create(list) {
      await lists.insertOne(list);
    },
    async update(list) {
      await lists.updateOne(
        { _id: list._id },
        { $set: list },
        { upsert: true }
      );
    },
    async findOne(listId) {
      return lists.findOne({ _id: listId });
    },
    async findAll() {
      return lists.find().toArray();
    },
    async remove(listId) {
      return lists.deleteOne({ _id: listId });
    },
    async markAsDone(listId) {
      await lists.updateOne(
        { _id: listId },
        { $set: { done: true } },
        { upsert: true }
      );
    },
  };
};

export default listRepositoryFactory;
