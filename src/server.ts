import { appFactory } from "./app";
import { socketFactory } from "./socket";
import { connection } from "./config/connection";

const port: string = process.env.PORT as string;
const chatPort: string = process.env.CHAT_PORT as string;

(async () => {
  const app = appFactory(await connection);
  const chatServer = socketFactory(app);

  chatServer.listen(chatPort, function () {
    console.log(`Chat Server is listening on ${chatPort}`);
  });

  app.listen(port, function () {
    console.log(`Family app API is listening on ${port}`);
  });
})();
