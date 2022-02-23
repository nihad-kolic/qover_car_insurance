"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../logger");
const config_1 = __importDefault(require("./../../config/config"));
const connectToDatabase = () => {
    mongoose_1.default
        .connect('mongodb://' + config_1.default.db.uri + ':' + config_1.default.db.port + '/' + config_1.default.db.name)
        .then(() => logger_1.logger.info('Successfully connected to DB.'))
        .catch((e) => {
        logger_1.logger.error(e);
        setTimeout(exports.connectToDatabase, 5000);
    });
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=mongooseConnection.js.map