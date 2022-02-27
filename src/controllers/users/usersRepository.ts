import { Db } from "mongodb";
import { UsersRepository } from "../../models/user";

const usersRepositoryFactory = (db: Db): UsersRepository => {
  const users = db.collection("users");

  return {
    async findOne(userId) {
      return users.findOne({ id: userId }, { projection: { _id: 0 } });
    },
    async findAll() {
      return users.find({}, { projection: { _id: false } }).toArray();
    },
  };
};

export default usersRepositoryFactory;
