const routes: Record<string, string> = {
  LOGIN: "/login",
  LOGOUT: "/logout/:username",
  LISTS: "/lists",
  LIST: "/list/:listId",
  LIST_DONE: "/list/:listId",
  TASKS: "/tasks/:categoryId",
  TASK: "/tasks/:taskId",
  TASK_DONE: "/tasks/:taskId/done",
  TOKEN: "/token",
  USERS: "/users",
};

export default routes;
