import { Db, ObjectId } from "mongodb";
import { ListRepository } from "../../models/list";

const LOOKUP_CONFIG = {
  from: "$tasks",
  localField: "_id",
  foreignField: "listId",
  as: "tasks",
};

const listRepositoryFactory = (db: Db): ListRepository => {
  const lists = db.collection("lists");

  return {
    async create(list) {
      return await lists.insertOne(list);
    },
    async update(list) {
      await lists.updateOne(
        { _id: new ObjectId(list._id) },
        { $set: list },
        { upsert: true }
      );
    },
    async findOne(listId) {
      const list = await lists.findOne({ _id: new ObjectId(listId) });

      if (list) {
        list.tasks = await lists.aggregate([
          {
            $lookup: LOOKUP_CONFIG,
          },
        ]);
      }

      return list;
    },
    async getAllIds() {
      return lists.distinct("_id");
    },
    async remove(listId) {
      return lists.deleteOne({ _id: new ObjectId(listId) });
    },
    async markAsDone(listId) {
      await lists.updateOne(
        { _id: new ObjectId(listId) },
        { $set: { done: 1 } },
        { upsert: true }
      );
    },
  };
};

export default listRepositoryFactory;
