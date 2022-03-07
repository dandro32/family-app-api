import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_SECRET,
  RESPONSE_OK,
} from "../../config";
import { StatusError } from "../../errors";
import { withErrorHandling } from "../../middlewares";

import { CreateUser, User, UsersRepository } from "../../models/user";

const generateAccessToken = (username: string): string => {
  return jwt.sign({ username }, JWT_ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = (username: string): string => {
  return jwt.sign({ username }, JWT_REFRESH_SECRET, {
    algorithm: "HS256",
  });
};

const usersControllerFactory = (usersRepositoryFactory: UsersRepository) =>
  withErrorHandling({
    async getUsers(_: Request, res: Response, next: NextFunction) {
      try {
        const users = await usersRepositoryFactory.findAll();

        res.json(users);
      } catch (e) {
        next(e);
      }
    },
    async logout(req: Request, res: Response, next: NextFunction) {
      try {
        const { username }: User = req.body;
        await usersRepositoryFactory.updateOne(username, { token: "" });

        res.sendStatus(204);
      } catch (e) {
        next(e);
      }
    },
    async token(req: Request, res: Response, next: NextFunction) {
      try {
        const { refreshToken } = req.body;

        const { token }: any = await usersRepositoryFactory.findByRefreshToken(
          // TODO: handle any
          refreshToken
        );

        if (refreshToken !== token) {
          throw new StatusError("Wrong refresh token.", 403);
        }

        jwt.verify(refreshToken, JWT_REFRESH_SECRET);

        res.cookie("accessToken", token);
        res.json(RESPONSE_OK);
      } catch (e) {
        next(e);
      }
    },
    async createUser(req: Request, res: Response, next: NextFunction) {
      try {
        const { username, password }: CreateUser = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const refreshToken = generateRefreshToken(username);

        await usersRepositoryFactory.create({
          username,
          password: hashedPassword,
          token: refreshToken,
        });
        const token = generateAccessToken(req.body);

        res.cookie("accessToken", token);
        res.cookie("refreshToken", refreshToken);
        res.json({ username });
      } catch (e) {
        next(e);
      }
    },
    async login(req: Request, res: Response, next: NextFunction) {
      try {
        const { username, password } = req.body;
        const user = await usersRepositoryFactory.findOne(username);

        if (!user) {
          throw new StatusError("User does not exists. Please register", 403);
        }

        const match = await bcrypt.compare(password, user?.password);
        if (!match) {
          throw new StatusError("Wrong password. Please try again", 403);
        }

        const accessToken = generateAccessToken(username);
        const refreshToken = generateRefreshToken(username);

        res.cookie("accessToken", accessToken);
        res.cookie("refreshToken", refreshToken);
        res.json({ username });
      } catch (e) {
        next(e);
      }
    },
  });

export default usersControllerFactory;
