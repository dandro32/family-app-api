import { NextFunction, Request, Response } from "express";
import { RESPONSE_OK } from "../../config";

import { withErrorHandling } from "../../middlewares";
import { ChatMessageParams, ChatRepository } from "../../models/chat";

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
    async addMessage(req: Request, res: Response, next: NextFunction) {
      try {
        await chatRepository.add(req.body as ChatMessageParams);
      } catch (e) {
        next(e);
      }
    },
  });

export default chatControllerFactory;
