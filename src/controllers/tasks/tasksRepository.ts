import { Db } from "mongodb";
import { TaskRepository } from "../../models/task";

const tasksRepositoryFactory = (db: Db): TaskRepository => {
  const tasks = db.collection("tasks");

  return {
    async create(task) {
      await tasks.insertOne(task);
    },
    async update(task) {
      await tasks.updateOne(
        { _id: task._id },
        { $set: task },
        { upsert: true }
      );
    },
    async findAll(listId) {
      return tasks.find({ listId }).toArray();
    },
    async remove(taskId) {
      return tasks.deleteOne({ _id: taskId });
    },
    async markAsDone(taskId) {
      await tasks.updateOne(
        { _id: taskId },
        { $set: { done: true } },
        { upsert: true }
      );
    },
  };
};

export default tasksRepositoryFactory;
