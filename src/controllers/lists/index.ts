import { NextFunction, Request, response, Response } from "express";
import { RESPONSE_OK } from "../../config";

import { withErrorHandling } from "../../middlewares";
import List, { CreateListParams, ListRepository } from "../../models/list";
import { TaskRepository } from "../../models/task";

const listsControllerFactory = (
  listsRepository: ListRepository,
  taskRepository: TaskRepository
) =>
  withErrorHandling({
    async getAllLists(_: Request, res: Response, next: NextFunction) {
      try {
        const listsIds = await listsRepository.getAllIds();
        const listsWithTasks = await Promise.all(
          listsIds.map(async (objectId) => {
            const listId = objectId.toString();
            const list = await listsRepository.findOne(listId);

            if (list) {
              list.tasks = (await taskRepository.findAll(listId)) || [];
            }

            return list;
          })
        );

        res.json(listsWithTasks);
      } catch (e) {
        next(e);
      }
    },
    async getList(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        const list = await listsRepository.findOne(listId);

        if (list) {
          list.tasks = (await taskRepository.findAll(listId)) || [];
        }

        res.json(list);
      } catch (e) {
        next(e);
      }
    },
    async addList(req: Request, res: Response, next: NextFunction) {
      try {
        const { title }: CreateListParams = req.body;

        const { insertedId } = await listsRepository.create({
          title,
          done: 0,
        });

        res.json(insertedId);
      } catch (e) {
        next(e);
      }
    },
    async updateList(req: Request, res: Response, next: NextFunction) {
      try {
        const listToUpdate: List = req.body;
        const listId = req.params.listId;

        await listsRepository.update(listToUpdate);
        await listsRepository.remove(listId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async deleteList(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        await listsRepository.remove(listId);
        await taskRepository.removeAll(listId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async markListAsDone(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        await listsRepository.markAsDone(listId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
  });

export default listsControllerFactory;
