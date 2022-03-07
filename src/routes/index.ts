import { Router } from "express";
import { Db } from "mongodb";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import usersControllerFactory from "../controllers/users";
import listsRepositoryFactory from "../controllers/lists/listRepository";
import listsControllerFactory from "../controllers/lists";

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

const listRouteFactory = (db: Db) => {
  const { LIST, LISTS, LIST_DONE } = routes;
  const router: Router = Router();
  const listsRepository = listsRepositoryFactory(db);
  const {
    getAllLists,
    getList,
    addList,
    updateList,
    deleteList,
    markListAsDone,
  } = listsControllerFactory(listsRepository);

  router.get(LISTS, extractJWT, getAllLists);
  router.get(LIST, extractJWT, getList);
  router.post(LIST, extractJWT, addList);
  router.put(LIST, extractJWT, updateList);
  router.delete(LIST, extractJWT, deleteList);
  router.get(LIST_DONE, extractJWT, markListAsDone);

  return router;
};

const usersRouteFactory = (db: Db) => {
  const { USERS, LOGIN, LOGOUT, TOKEN } = routes;
  const router: Router = Router();
  const usersRepository = usersRepositoryFactory(db);
  const { createUser, getUsers, login, logout, token } =
    usersControllerFactory(usersRepository);

  router.post(TOKEN, validateTokenMiddleWare, token);
  router.post(LOGIN, validateUserMiddleware, login);
  router.delete(LOGOUT, extractJWT, logout);
  router.get(USERS, extractJWT, getUsers);
  router.post(USERS, validateUserMiddleware, createUser);

  return router;
};

export { listRouteFactory, taskRouteFactory, usersRouteFactory };
