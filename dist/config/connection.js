"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongodb_1 = require("mongodb");
const url = process.env.MONGO_URL;
exports.connection = mongodb_1.MongoClient.connect(url).then(function (client) {
    return client.db();
});
