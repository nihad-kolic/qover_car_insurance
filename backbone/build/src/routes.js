"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtValidationChecker_1 = __importDefault(require("./middleware/jwtValidationChecker"));
function default_1(app) {
    /**
     * GET /healthcheck - Used by client service to ping server
     */
    app.get('/healthcheck', (req, res) => res.sendStatus(200));
    /**
     * POST /api/auth -
     */
    app.post('/api/auth', jwtValidationChecker_1.default, (req, res) => {
        //
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map