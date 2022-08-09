import { appFactory } from "./app";
import { connection } from "./config/connection";

const port: string = process.env.PORT as string;

(async () => {
  const app = appFactory(await connection);

  app.listen(port, function () {
    console.log(`Family app API is listening on ${port}`);
  });
})();
