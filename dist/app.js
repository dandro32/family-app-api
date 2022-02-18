"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appFactory = void 0;
const express_1 = __importDefault(require("express"));
const appFactory = (db) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/", function (req, res, next) {
        res.send("Family-app is working");
    });
    return app;
};
exports.appFactory = appFactory;
