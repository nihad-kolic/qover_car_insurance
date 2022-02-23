"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 3000,
    host: 'localhost',
    dbUri: 'mongodb://localhost:27017',
    db: {
        uri: '127.0.0.1',
        port: 27017,
        name: 'car_insurance_db'
    },
    jwt: {
        secret: 'qoversupersecret',
        expiration: 3600,
        issuer: 'QoverCompany'
    },
    loggerConfiguration: {
        consoleLogLevel: 'info',
        logToFile: true,
        fileLogLevel: 'info',
        filename: 'backbone.log'
    }
};
//# sourceMappingURL=default.js.map