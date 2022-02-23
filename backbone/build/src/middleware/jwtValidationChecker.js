"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./../../config/config"));
const validateJWT = (req, res, next) => {
    var _a;
    logger_1.logger.debug('jwtValidationChecker::validateJWT - Validating json web token started...');
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret, (error, decoded) => {
            if (error) {
                logger_1.logger.error('jwtValidationChecker::validateJWT - Error while validating json web token: ', error);
                res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.default = validateJWT;
//# sourceMappingURL=jwtValidationChecker.js.map