"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = require("./src/logger");
const mongooseConnection_1 = require("./src/db/mongooseConnection");
const routes_1 = __importDefault(require("./src/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
(0, mongooseConnection_1.connectToDatabase)();
/**
 * middleware that logs out the request url
 * app.use(
 *   (req: express.Request, res: express.Response, next: express.NextFunction) => {
 *     logger.info(req.originalUrl);
 *     next();
 *   }
 * );
 */
app.listen(3000, () => {
    logger_1.logger.info(`Server up and running  on PORT: ${config_1.default.host}:${config_1.default.port}`);
    (0, routes_1.default)(app);
});
//# sourceMappingURL=index.js.map