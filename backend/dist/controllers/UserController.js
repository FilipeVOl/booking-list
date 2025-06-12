"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    async createUser(req, res) {
        try {
            UserService_1.default.validateCreateUser(req);
            const user = await UserService_1.default.create(req.body);
            return res.status(201).json({
                message: 'Usuário criado com sucesso',
                user
            });
        }
        catch (err) {
            return res.status(400).json({
                message: 'Erro ao criar usuário',
                error: err.message
            });
        }
    }
}
exports.default = new UserController();
