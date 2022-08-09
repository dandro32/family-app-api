import express from "express";
import cors from "cors";
import { Db } from "mongodb";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";

import { errorLogger, logger } from "./logger";
import { errorHandler, notFound } from "./errors";
import {
  chatRouteFactory,
  listRouteFactory,
  taskRouteFactory,
  usersRouteFactory,
} from "./routes";
import { API_ROUTE } from "./config";

export const appFactory = (db: Db) => {
  const app = express();
  const usersRoutes = usersRouteFactory(db);
  const listRoutes = listRouteFactory(db);
  const taskRoutes = taskRouteFactory(db);
  const chatRoutes = chatRouteFactory(db);

  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://family-app-fe.herokuapp.com",
        "https://family-app-fe.herokuapp.com/lists",
        "https://family-app-fe.herokuapp.com/all-lists",
      ],
    })
  );
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(express.json());

  app.use(logger);

  app.get("/", function (req, res, next) {
    res.send("Family-app is working");
  });

  app.use(API_ROUTE, usersRoutes);
  app.use(API_ROUTE, listRoutes);
  app.use(API_ROUTE, taskRoutes);
  app.use(API_ROUTE, chatRoutes);

  app.use(errorLogger);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
