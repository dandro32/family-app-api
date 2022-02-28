import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRE_ACCESS } from "../../config";

import { UsersRepository } from "../../models/user";

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
        const me = await usersRepositoryFactory.findOne(req.params.id);

        res.json(me);
      } catch (e) {
        next(e);
      }
    },
    async createUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { login, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = login.toUpperCase();

        const me = await usersRepositoryFactory.create({
          id,
          name: login,
          password: hashedPassword,
        });

        const token = jwt.sign({ hashedPassword }, process.env.JWT_SECRET as string, {
          algorithm: "HS256",
          expiresIn: JWT_EXPIRE_ACCESS,
        });

        res.cookie("token", token, { maxAge: JWT_EXPIRE_ACCESS * 1000 });

        res.json(me);
      } catch (e) {
        next(e);
      }
    },
  };
};

export default usersControllerFactory;
