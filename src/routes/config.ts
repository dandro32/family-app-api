const routes: Record<string, string> = {
  CHAT: "/chat",
  LIST_DONE: "/list/:listId/done",
  LIST: "/list/:listId",
  LISTS: "/lists",
  LOGIN: "/login",
  LOGOUT: "/logout/:username",
  TASK_DONE: "/task/:taskId/done",
  TASK: "/task/:taskId",
  TASKS: "/tasks/:listId",
  TOKEN: "/token",
  USERS: "/users",
};

export default routes;
