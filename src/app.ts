import express from "express";
import basicAuth from "express-basic-auth";
import { Db } from "mongodb";

import { errorHandler, notFound } from "./errors";

const authPass: string = process.env.BASIC_AUTH as string;

export const appFactory = (db: Db) => {
  const app = express();

  app.use(
    basicAuth({
      users: { task_creator: authPass },
    })
  );

  app.use(express.json());

  app.get("/", function (req, res, next) {
    res.send("Family-app is working");
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
