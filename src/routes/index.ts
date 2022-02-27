import { Router } from "express";
import { Db } from "mongodb";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import usersControllerFactory from "../controllers/users";

import routes from "./config";

const taskRouteFactory = (db: Db) => {
  const { TASKS, TASK, TASK_DONE } = routes;
  const router: Router = Router();

  // TODO: Add repository and services

  return router;
};

const usersRouteFactory = (db: Db) => {
  const { USERS, USERS_ME } = routes;
  const router: Router = Router();
  const usersRepository = usersRepositoryFactory(db);
  const { createUser, getUsers, getMe } = usersControllerFactory(usersRepository);

  router.get(USERS, getUsers);
  router.post(USERS, createUser)
  router.get(USERS_ME, getMe);

  return router;
};

export { taskRouteFactory, usersRouteFactory };
