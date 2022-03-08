import { NextFunction, Request, Response } from "express";
import { RESPONSE_OK } from "../../config";

import { StatusError } from "../../errors";
import { withErrorHandling } from "../../middlewares";
import Task, { CreateTaskParams, TaskRepository } from "../../models/task";

const tasksControllerFactory = (tasksRepositoryFactory: TaskRepository) =>
  withErrorHandling({
    async getAllTaskFromList(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        const tasks = await tasksRepositoryFactory.findAll(listId);

        res.json(tasks);
      } catch (e) {
        next(e);
      }
    },
    async addTask(req: Request, res: Response, next: NextFunction) {
      try {
        const { listId, title, username }: CreateTaskParams = req.body;
        await tasksRepositoryFactory.create({
          listId,
          title,
          username,
        });

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async updateTask(req: Request, res: Response, next: NextFunction) {
      try {
        const taskToUpdate: Task = req.body;
        await tasksRepositoryFactory.update(taskToUpdate);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async deleteTask(req: Request, res: Response, next: NextFunction) {
      try {
        const taskId = req.params.taskId;
        const deleteStatus = await tasksRepositoryFactory.remove(taskId);

        res.json(deleteStatus);
      } catch (e) {
        next(e);
      }
    },
    async markTaskAsDone(req: Request, res: Response, next: NextFunction) {
      try {
        const taskId = req.params.taskId;
        await tasksRepositoryFactory.markAsDone(taskId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
  });

export default tasksControllerFactory;
