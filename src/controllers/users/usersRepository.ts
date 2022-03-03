import { Db } from "mongodb";
import { UsersRepository } from "../../models/user";

const usersRepositoryFactory = (db: Db): UsersRepository => {
  const users = db.collection("users");

  return {
    async findOne(username) {
      return users.findOne({ username }, { projection: { _id: 0 } });
    },
    async findAll() {
      return users.find({}, { projection: { _id: 0, password: 0 } }).toArray();
    },
    async create(credentials) {
      await users.insertOne(credentials);
    },
  };
};

export default usersRepositoryFactory;
