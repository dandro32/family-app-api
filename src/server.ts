import { appFactory } from "./app";
import { connection } from "./config/connection";

(async () => {
  const app = appFactory(await connection);

  app.listen(process.env.PORT, function () {
    console.log("Family app API is listening on 3000");
  });
})();
