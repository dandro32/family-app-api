import { Router } from "express";
import { Db } from "mongodb";

import routes from "./config";
import { extractJWT } from "../middlewares";
import listsControllerFactory from "../controllers/lists";
import listsRepositoryFactory from "../controllers/lists/listRepository";
import tasksControllerFactory from "../controllers/tasks";
import tasksRepositoryFactory from "../controllers/tasks/tasksRepository";
import usersControllerFactory from "../controllers/users";
import usersRepositoryFactory from "../controllers/users/usersRepository";
import validateTokenMiddleWare from "../controllers/users/validateTokenMiddleWare";
import validateUserMiddleware from "../controllers/users/validateUserMiddleware";
import validateListMiddleware from "../controllers/lists/validateListMiddleware";
import validateTaskMiddleware from "../controllers/tasks/validateTaskMiddleware";

const listRouteFactory = (db: Db) => {
  const { LIST, LISTS, LIST_DONE } = routes;
  const router: Router = Router();
  const listsRepository = listsRepositoryFactory(db);
  const {
    addList,
    deleteList,
    getAllLists,
    getList,
    markListAsDone,
    updateList,
  } = listsControllerFactory(listsRepository);

  router.get(LISTS, extractJWT, getAllLists);
  router.get(LIST, extractJWT, getList);
  router.post(LIST, extractJWT, validateListMiddleware, addList);
  router.put(LIST, extractJWT, validateListMiddleware, updateList);
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

const taskRouteFactory = (db: Db) => {
  const { TASKS, TASK, TASK_DONE } = routes;
  const router: Router = Router();
  const tasksRepository = tasksRepositoryFactory(db);

  const {
    getAllTaskFromList,
    addTask,
    updateTask,
    deleteTask,
    markTaskAsDone,
  } = tasksControllerFactory(tasksRepository);

  router.get(TASKS, extractJWT, getAllTaskFromList);
  router.post(TASKS, extractJWT, validateTaskMiddleware, addTask);
  router.put(TASK, extractJWT, validateTaskMiddleware, updateTask);
  router.delete(TASK, extractJWT, deleteTask);
  router.get(TASK_DONE, extractJWT, markTaskAsDone);

  return router;
};

export { listRouteFactory, taskRouteFactory, usersRouteFactory };
