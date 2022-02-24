"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersRepositoryFactory = (db) => {
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
exports.default = usersRepositoryFactory;
