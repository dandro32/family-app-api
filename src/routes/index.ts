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
import chatRepositoryFactory from "../controllers/chat/chatRepository";
import chatControllerFactory from "../controllers/chat";

const listRouteFactory = (db: Db) => {
  const { LIST, LISTS, LIST_DONE } = routes;
  const router: Router = Router();
  const listsRepository = listsRepositoryFactory(db);
  const taskRepository = tasksRepositoryFactory(db);
  const {
    addList,
    deleteList,
    getAllLists,
    getList,
    markListAsDone,
    updateList,
  } = listsControllerFactory(listsRepository, taskRepository);

  router.get(LISTS, extractJWT, getAllLists);
  router.post(LISTS, extractJWT, validateListMiddleware, addList);
  router.get(LIST, extractJWT, getList);
  router.put(LIST, extractJWT, validateListMiddleware, updateList);
  router.delete(LIST, extractJWT, deleteList);
  router.patch(LIST_DONE, extractJWT, markListAsDone);

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
  router.patch(TASK_DONE, extractJWT, markTaskAsDone);

  return router;
};

const chatRouteFactory = (db: Db) => {
  const { CHAT } = routes;
  const router: Router = Router();
  const chatRepository = chatRepositoryFactory(db);
  const { getAll } = chatControllerFactory(chatRepository);

  router.get(CHAT, extractJWT, getAll);

  return router;
};

export {
  chatRouteFactory,
  listRouteFactory,
  taskRouteFactory,
  usersRouteFactory,
};
