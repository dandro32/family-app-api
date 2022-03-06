import { Router } from "express";
import { Db } from "mongodb";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import usersControllerFactory from "../controllers/users";

import routes from "./config";
import { extractJWT } from "../middlewares";
import validateUserMiddleware from "../controllers/users/validateUserMiddleware";
import validateTokenMiddleWare from "../controllers/users/validateTokenMiddleWare";

const taskRouteFactory = (db: Db) => {
  const { TASKS, TASK, TASK_DONE } = routes;
  const router: Router = Router();

  // TODO: Add repository and services

  return router;
};

const usersRouteFactory = (db: Db) => {
  const { USERS, USERS_ME, LOGIN, LOGOUT, TOKEN } = routes;
  const router: Router = Router();
  const usersRepository = usersRepositoryFactory(db);
  const { createUser, getUsers, getMe, login, logout, token } =
    usersControllerFactory(usersRepository);

  router.post(LOGIN, validateUserMiddleware, login);
  router.delete(LOGOUT, extractJWT, logout);
  router.post(TOKEN, validateTokenMiddleWare, token);
  router.get(USERS_ME, extractJWT, getMe);
  router.get(USERS, extractJWT, getUsers);
  router.post(USERS, validateUserMiddleware, createUser);

  return router;
};

export { taskRouteFactory, usersRouteFactory };
