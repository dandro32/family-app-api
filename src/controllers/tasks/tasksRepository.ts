import { Db, ObjectId } from "mongodb";
import { TaskRepository } from "../../models/task";

const taskRepositoryFactory = (db: Db): TaskRepository => {
  const tasks = db.collection("tasks");

  return {
    async create(task) {
      await tasks.insertOne(task);
    },
    async update(task) {
      await tasks.updateOne({ id: task.id }, { $set: task }, { upsert: true });
    },
    async findOne(taskId) {
      return tasks.findOne({ id: taskId },  { projection: { _id: 0 } });
    },
    async findAll(categoryId) {
      return tasks.find({ categoryId }, { projection: { _id: false } }).toArray();
    },
    async remove(taskId) {
      return tasks.deleteOne({id: taskId});
    },
  };
};

export default taskRepositoryFactory;
