"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'development') {
    dotenv_1.default.config();
}
exports.default = {
    port: 3000,
    host: process.env.HOST || 'localhost',
    db: {
        uri: process.env.DB_URI || '127.0.0.1',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'car_insurance_db'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'qoversupersecret',
        expiration: process.env.JWT_EXPIRATION || 3600,
        issuer: process.env.JWT_ISSUER || 'QoverCompany'
    },
    loggerConfiguration: {
        consoleLogLevel: process.env.LOG_CONSOLE_LEVEL || 'debug',
        logToFile: process.env.LOG_TO_FILE || true,
        fileLogLevel: process.env.LOG_FILE_LEVEL || 'debug',
        filename: 'backbone.log'
    }
};
//# sourceMappingURL=config.js.map