import { UsersRepository } from "../../models/user";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';

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
        
        const me = await usersRepositoryFactory.create({login, password: hashedPassword});

        res.json(me);
      } catch (e) {
        next(e);
      }
    },
  };
};

export default usersControllerFactory;
