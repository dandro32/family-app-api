import express from "express";
import basicAuth from "express-basic-auth";
import { Db } from "mongodb";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";

import { errorLogger, logger } from "./logger";
import { errorHandler, notFound } from "./errors";
import routeFactory from "./routes";

const authPass: string = process.env.BASIC_AUTH as string;

export const appFactory = (db: Db) => {
  const app = express();
  const apiRoutes = routeFactory(db);

  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(
    basicAuth({
      users: { task_creator: authPass },
    })
  );

  app.use(express.json());

  app.use(logger);

  app.get("/", function (req, res, next) {
    res.send("Family-app is working");
  });

  app.use("/api", apiRoutes);

  app.use(errorLogger);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
