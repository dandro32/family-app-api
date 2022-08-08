import { Server } from "socket.io";
import http from "http";

export const socketFactory = (app: any) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "https://family-app-fe.herokuapp.com"],
      // methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chatMessage", (msg) => {
      console.log("chatMessage", msg);
      io.emit("chatMessage", { ...msg, date: new Date().toLocaleString });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return server;
};
