import { RequestHandler } from "express";
import { StatusError } from "../../errors";
import validateToken from "./validateToken";

const validateTokenMiddleWare: RequestHandler = (req, res, next) => {
  const message = validateToken(req.body);

  if (message) {
    const error = new StatusError("No refresh token/user data send", 401);

    next(error);
  } else {
    next();
  }
};

export default validateTokenMiddleWare;
