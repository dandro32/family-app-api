import { RequestHandler, ErrorRequestHandler } from "express";

export class StatusError extends Error {
  constructor(readonly error: string | object, readonly status: number) {
    super();
  }
}

export const notFound: RequestHandler = (req, res, next) => {
  const err = new StatusError("Not Found", 404);
  next(err);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
};
