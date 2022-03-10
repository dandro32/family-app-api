import { NextFunction, Request, Response } from "express";
import { RESPONSE_OK } from "../../config";

import { withErrorHandling } from "../../middlewares";
import List, { CreateListParams, ListRepository } from "../../models/list";

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
        const { title, tasks }: CreateListParams = req.body;

        await listsRepositoryFactory.create({
          title,
          tasks,
          done: 0,
        });

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async updateList(req: Request, res: Response, next: NextFunction) {
      try {
        const listToUpdate: List = req.body;
        const listId = req.params.listId;

        await listsRepositoryFactory.update({ ...listToUpdate, _id: listId });
      } catch (e) {
        next(e);
      }
    },
    async deleteList(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        const deleteStatus = await listsRepositoryFactory.remove(listId);

        res.json(deleteStatus);
      } catch (e) {
        next(e);
      }
    },
    async markListAsDone(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        await listsRepositoryFactory.markAsDone(listId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
  });

export default listsControllerFactory;
