"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const config_1 = __importDefault(require("./../../config/config"));
const transportsArray = [];
transportsArray.push(new winston_1.transports.Console({ level: config_1.default.loggerConfiguration.consoleLogLevel }));
if (config_1.default.loggerConfiguration.logToFile) {
    transportsArray.push(new winston_1.transports.File({ filename: 'logs/' + config_1.default.loggerConfiguration.filename, level: config_1.default.loggerConfiguration.fileLogLevel }));
}
exports.logger = (0, winston_1.createLogger)({
    transports: transportsArray,
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}]::${level}::${message}`;
    }))
});
//# sourceMappingURL=index.js.map