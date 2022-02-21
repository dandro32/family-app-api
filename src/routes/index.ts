import { Router } from "express";
import { Db } from "mongodb";
import routes from "./config";

const routeFactory = (db: Db) => {
  const { CATEGORY, CATEGORIES, TASKS, TASK, TASK_DONE } = routes;
  const router = Router();

  // TODO: Add repository and services


  return router;
};

export default routeFactory;
