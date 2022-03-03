import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { StatusError } from "../errors";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1]; // Remove bearer

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      res.locals.jwt = decoded;
    } catch (err) {
      const error = new StatusError(err as string, 401);

      next(error);
    }
  }

  next();
};

export default extractJWT;
