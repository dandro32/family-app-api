import { Router } from "express";
import { Db } from "mongodb";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import usersControllerFactory from "../controllers/users";

import routes from "./config";
import { extractJWT } from "../middlewares";
import validateUserMiddleware from "../controllers/users/validateUserMiddleware";

const taskRouteFactory = (db: Db) => {
  const { TASKS, TASK, TASK_DONE } = routes;
  const router: Router = Router();

  // TODO: Add repository and services

  return router;
};

const usersRouteFactory = (db: Db) => {
  const { USERS, USERS_ME, LOGIN } = routes;
  const router: Router = Router();
  const usersRepository = usersRepositoryFactory(db);
  const { createUser, getUsers, getMe, login } = usersControllerFactory(usersRepository);

  router.post(USERS, validateUserMiddleware ,createUser)
  router.post(LOGIN, validateUserMiddleware, login)
  router.get(USERS, extractJWT, getUsers);
  router.get(USERS_ME, extractJWT, getMe);

  return router;
};

export { taskRouteFactory, usersRouteFactory };
