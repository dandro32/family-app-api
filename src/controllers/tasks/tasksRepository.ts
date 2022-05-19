import { Db, ObjectId } from "mongodb";
import { TaskRepository } from "../../models/task";

const tasksRepositoryFactory = (db: Db): TaskRepository => {
  const tasks = db.collection("tasks");

  return {
    async create(task) {
      return await tasks.insertOne(task);
    },
    async update(task) {
      await tasks.updateOne(
        { _id: new ObjectId(task._id) },
        { $set: task },
        { upsert: true }
      );
    },
    async findAll(listId) {
      return tasks.find({ listId }).toArray();
    },
    async remove(taskId) {
      return tasks.deleteOne({ _id: new ObjectId(taskId) });
    },
    async removeAll(listId) {
      return tasks.deleteMany({ listId });
    },
    async markAsDone(taskId, status) {
      await tasks.updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { done: status } },
        { upsert: true }
      );
    },
  };
};

export default tasksRepositoryFactory;
