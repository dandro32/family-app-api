import { Server } from "socket.io";
import http from "http";

import { Db } from "mongodb";
import chatRepositoryFactory from "./controllers/chat/chatRepository";
import { ChatMessageParams } from "./models/chat";

export const socketFactory = (server: any, db: Db) => {
  const { add } = chatRepositoryFactory(db);

  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://family-app-fe.herokuapp.com",
        "https://family-app-fe.herokuapp.com/lists",
        "https://family-app-fe.herokuapp.com/all-lists",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chatMessage", (msg) => {
      const newMassege: ChatMessageParams = {
        ...msg,
        date: new Date().toLocaleString(),
        readed: false,
      };

      io.emit("chatMessage", newMassege);
      add(newMassege);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return server;
};
