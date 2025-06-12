"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    static validateLogin(req) {
        const requiredFields = ['email', 'password'];
        requiredFields.forEach(field => {
            if (!req.body[field]) {
                throw new Error(`${field} is required`);
            }
        });
    }
    static async login(data) {
        const user = await this.userRepository.findOne({ where: { email: data.email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user.email);
        const refreshToken = await this.generateRefreshToken(user.email);
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);
        const { password } = user, userData = __rest(user, ["password"]);
        return Object.assign(Object.assign({}, userData), { token,
            refreshToken });
    }
    ;
    static generateToken(email) {
        return (0, jsonwebtoken_1.sign)({ email }, process.env.JWT_SECRET || 'default-secret', { expiresIn: '1h' });
    }
    ;
    static async generateRefreshToken(email) {
        const refreshToken = (0, jsonwebtoken_1.sign)({ email }, process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret', { expiresIn: '15d' });
        return refreshToken;
    }
    ;
    static async getProfile(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const { password, refreshToken } = user, userData = __rest(user, ["password", "refreshToken"]);
        return userData;
    }
}
AuthService.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
exports.default = AuthService;
