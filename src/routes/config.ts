const routes: Record<string, string> = {
  LIST_DONE: "/list/:listId",
  LIST: "/list/:listId",
  LISTS: "/lists",
  LOGIN: "/login",
  LOGOUT: "/logout/:username",
  TASK_DONE: "/tasks/:taskId/done",
  TASK: "/tasks/:taskId",
  TASKS: "/tasks/:listId",
  TOKEN: "/token",
  USERS: "/users",
};

export default routes;
