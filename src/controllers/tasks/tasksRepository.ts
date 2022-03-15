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
    async markAsDone(taskId) {
      await tasks.updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { done: 1 } },
        { upsert: true }
      );
    },
  };
};

export default tasksRepositoryFactory;
