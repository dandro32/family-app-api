import { NextFunction, Request, Response } from "express";
import { RESPONSE_OK } from "../../config";

import { withErrorHandling } from "../../middlewares";
import Task, { CreateTaskParams, TaskRepository } from "../../models/task";

const tasksControllerFactory = (tasksRepository: TaskRepository) =>
  withErrorHandling({
    async getAllTaskFromList(req: Request, res: Response, next: NextFunction) {
      try {
        const listId = req.params.listId;
        const tasks = await tasksRepository.findAll(listId);

        res.json(tasks);
      } catch (e) {
        next(e);
      }
    },
    async addTask(req: Request, res: Response, next: NextFunction) {
      try {
        const { title, username }: CreateTaskParams = req.body;
        const listId = req.params.listId;

        await tasksRepository.create({
          listId,
          title,
          username,
          done: 0,
        });

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async updateTask(req: Request, res: Response, next: NextFunction) {
      try {
        const taskToUpdate: Task = req.body;
        const taskId = req.params.taskId;
        await tasksRepository.update({ ...taskToUpdate });
        await tasksRepository.remove(taskId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async deleteTask(req: Request, res: Response, next: NextFunction) {
      try {
        const taskId = req.params.taskId;
        await tasksRepository.remove(taskId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async markTaskAsDone(req: Request, res: Response, next: NextFunction) {
      try {
        const taskId = req.params.taskId;
        await tasksRepository.markAsDone(taskId);

        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
  });

export default tasksControllerFactory;
