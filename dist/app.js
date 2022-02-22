"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appFactory = void 0;
const express_1 = __importDefault(require("express"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./config/swagger.json"));
const logger_1 = require("./logger");
const errors_1 = require("./errors");
const routes_1 = __importDefault(require("./routes"));
const authPass = process.env.BASIC_AUTH;
const appFactory = (db) => {
    const app = (0, express_1.default)();
    const apiRoutes = (0, routes_1.default)(db);
    app.use("/swagger-ui", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    app.use((0, express_basic_auth_1.default)({
        users: { task_creator: authPass },
    }));
    app.use(express_1.default.json());
    app.use(logger_1.logger);
    app.get("/", function (req, res, next) {
        res.send("Family-app is working");
    });
    app.use("/api", apiRoutes);
    app.use(logger_1.errorLogger);
    app.use(errors_1.notFound);
    app.use(errors_1.errorHandler);
    return app;
};
exports.appFactory = appFactory;
