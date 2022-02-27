const routes: Record<string, string> = {
  CATEGORIES: "/categories",
  CATEGORY: "/category/:categoryId",
  TASKS: "/tasks/:categoryId",
  TASK: "/tasks/:taskId",
  TASK_DONE: "/tasks/:taskId/done",
  USERS: "/users",
  USERS_ME: "/users/:id",
};

export default routes;
