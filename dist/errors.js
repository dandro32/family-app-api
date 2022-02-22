"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = exports.StatusError = void 0;
class StatusError extends Error {
    constructor(error, status) {
        super();
        this.error = error;
        this.status = status;
    }
}
exports.StatusError = StatusError;
const notFound = (req, res, next) => {
    const err = new StatusError("Not Found", 404);
    next(err);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV === "production" ? {} : err.stack,
    });
};
exports.errorHandler = errorHandler;
