import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import { StatusError } from "../../errors";
import { withErrorHandling } from "../../middlewares";
import { ListRepository } from "../../models/list";

const listsControllerFactory = (listsRepositoryFactory: ListRepository) =>
  withErrorHandling({
    async getAllLists(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async getList(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        const list = await listsRepositoryFactory.findOne(listId);

        res.json(list);
      } catch (e) {
        next(e);
      }
    },
    async addList(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async updateList(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async deleteList(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async markListAsDone(_: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
  });

export default listsControllerFactory;
