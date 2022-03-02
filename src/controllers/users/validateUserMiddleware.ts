import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateUser from "./validateUser";

const validateUserMiddleware: RequestHandler = (req, res, next) => {
  const result = validateUser(req.body);

  if (!result.success) {
    const error = new StatusError(result.error, 400);
    next(error);
  } else {
    next();
  }
};

export default validateUserMiddleware;
