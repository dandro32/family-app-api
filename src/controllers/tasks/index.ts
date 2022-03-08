import { NextFunction, Request, Response } from "express";

import { StatusError } from "../../errors";
import { withErrorHandling } from "../../middlewares";
import { ListRepository } from "../../models/list";

const listsControllerFactory = (listsRepositoryFactory: ListRepository) =>
  withErrorHandling({
    async getAllTaskFromList(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async addTask(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async updateTask(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async deleteTask(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
    async markTaskAsDone(_: Request, res: Response, next: NextFunction) {
      try {
      } catch (e) {
        next(e);
      }
    },
  });

export default listsControllerFactory;
