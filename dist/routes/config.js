"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = {
    CATEGORIES: '/categories',
    CATEGORY: '/category/:categoryId',
    TASKS: '/tasks/:categoryId',
    TASK: '/tasks/:taskId',
    TASK_DONE: '/tasks/:taskId/done',
    USERS: '/users',
    USERS_ME: '/users/me',
};
exports.default = routes;
