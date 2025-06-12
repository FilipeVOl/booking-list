"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const Token_1 = __importDefault(require("../middlewares/Token"));
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
authRoutes.post('/login', AuthController_1.default.login.bind(AuthController_1.default));
authRoutes.get('/me', Token_1.default.authorize.bind(Token_1.default), AuthController_1.default.me.bind(AuthController_1.default));
