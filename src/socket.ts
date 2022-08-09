import { Server } from "socket.io";
import http from "http";
import { connection } from "./config/connection";

import { Db } from "mongodb";
import chatRepositoryFactory from "./controllers/chat/chatRepository";

export const socketFactory = (db: Db) => {
  const server = http.createServer();
  const { add } = chatRepositoryFactory(db);

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "https://family-app-fe.herokuapp.com"],
      methods: ["GET", "POST"],
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

  return server;
};

const chatPort: string = (process.env.CHAT_PORT as string) || "80";

(async () => {
  const chatServer = socketFactory(await connection);

  chatServer.listen(chatPort, function () {
    console.log(`Family app socket is listening on ${chatPort}`);
  });
})();
