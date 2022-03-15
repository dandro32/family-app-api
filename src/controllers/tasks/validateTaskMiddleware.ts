import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateTask from "./validateTask";

const validateTaskMiddleware: RequestHandler = (req, res, next) => {
  const message = validateTask(req.body, req.method === "PUT");

  if (message) {
    const error = new StatusError(message, 400);

    next(error);
  } else {
    next();
  }
};

export default validateTaskMiddleware;
