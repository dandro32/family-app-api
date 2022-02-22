import { UsersRepository } from "../../models/user";
import { NextFunction, Request, Response } from "express";

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
  };
};

export default usersControllerFactory;
