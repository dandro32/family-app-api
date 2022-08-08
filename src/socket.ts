import { Server } from "socket.io";

import { Db } from "mongodb";
import chatRepositoryFactory from "./controllers/chat/chatRepository";

export const socketFactory = (app: any, db: Db) => {
  const { add } = chatRepositoryFactory(db);

  const io = new Server(app, {
    cors: {
      origin: ["http://localhost:3000", "https://family-app-fe.herokuapp.com"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chatMessage", (msg) => {
      const newMassege = { ...msg, date: new Date().toLocaleString };

      io.emit("chatMessage", newMassege);
      add(newMassege);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
