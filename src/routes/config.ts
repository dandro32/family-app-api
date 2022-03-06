const routes: Record<string, string> = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  TASKS: "/tasks/:categoryId",
  TASK: "/tasks/:taskId",
  TASK_DONE: "/tasks/:taskId/done",
  TOKEN: "/token",
  USERS: "/users",
  USERS_ME: "/users/:id",
};

export default routes;
