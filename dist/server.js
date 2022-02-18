"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const connection_1 = require("./config/connection");
(async () => {
    const app = (0, app_1.appFactory)(await connection_1.connection);
    app.listen(process.env.PORT, function () {
        console.log("Family app is listening on 3000");
    });
})();
