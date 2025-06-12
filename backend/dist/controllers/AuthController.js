"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthController {
    static async login(req, res) {
        try {
            AuthService_1.default.validateLogin(req);
            const auth = await AuthService_1.default.login(req.body);
            return res.status(200).json(auth);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
    static async me(req, res) {
        try {
            const user = await AuthService_1.default.getProfile(req.body.email);
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}
exports.default = AuthController;
