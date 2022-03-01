import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE_ACCESS, JWT_SECRET } from "../../config";
import { StatusError } from "../../errors";

import { User, UsersRepository } from "../../models/user";

const singJWT = ({ username }: User): string => {
  const timeNow: number = new Date().getTime();
  const expirationTime: number = timeNow + JWT_EXPIRE_ACCESS * 1000;
  const expirationTimeInSeconds: number = Math.floor(expirationTime / 1000);

  return jwt.sign({ username }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: expirationTimeInSeconds,
  });
};

const usersControllerFactory = (usersRepositoryFactory: UsersRepository) => {
  return {
    async getUsers(_: Request, res: Response, next: NextFunction) {
      try {
        const users = await usersRepositoryFactory.findAll();

        res.json(users);
      } catch (e) {
        next(e);
      }
    },
    async getMe(req: Request, res: Response, next: NextFunction) {
      try {
        const me = await usersRepositoryFactory.findOne(req.params.username);

        res.json(me);
      } catch (e) {
        next(e);
      }
    },
    async createUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const me = await usersRepositoryFactory.create({
          id: username.toUpperCase(),
          username,
          password: hashedPassword,
        });
        const token = singJWT(req.body);

        res.cookie("token", token, { maxAge: JWT_EXPIRE_ACCESS * 1000 });
        res.json(me);
      } catch (e) {
        next(e);
      }
    },
    async login(req: Request, res: Response, next: NextFunction) {
      try {
        const { username, password } = req.body;
        const user = await usersRepositoryFactory.findOne(username);
        const match = await bcrypt.compare(password, user?.password);

        if (match) {
          const token = singJWT(req.body);

          res.cookie("token", token, { maxAge: JWT_EXPIRE_ACCESS * 1000 });
        } else {
          throw new StatusError("User cannot be sign", 401);
        }
      } catch (e) {
        next(e);
      }
    },
  };
};

export default usersControllerFactory;
