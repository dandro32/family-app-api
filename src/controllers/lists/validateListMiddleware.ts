import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateList from "./validateList";

const validateListMiddleware: RequestHandler = (req, res, next) => {
  const message = validateList(req.body, req.method === "PUT");

  if (message) {
    const error = new StatusError(message, 400);

    next(error);
  } else {
    next();
  }
};

export default validateListMiddleware;
