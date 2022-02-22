"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("./config"));
const routeFactory = (db) => {
    const { CATEGORY, CATEGORIES, TASKS, TASK, TASK_DONE, USERS, USERS_ME } = config_1.default;
    const router = (0, express_1.Router)();
    // TODO: Add repository and services
    return router;
};
exports.default = routeFactory;
