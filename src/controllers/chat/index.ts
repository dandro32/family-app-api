import { NextFunction, Request, Response } from "express";

import { withErrorHandling } from "../../middlewares";
import { ChatRepository } from "../../models/chat";

const chatControllerFactory = (chatRepository: ChatRepository) =>
  withErrorHandling({
    async getAll(_: Request, res: Response, next: NextFunction) {
      try {
        const messages = await chatRepository.findAll();

        res.json(messages);
      } catch (e) {
        next(e);
      }
    },
  });

export default chatControllerFactory;
