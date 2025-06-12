"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
class UserService {
    validateCreateUser(req) {
        const requiredFields = ["name", "email", "password", "cpf"];
        requiredFields.forEach((field) => {
            if (!req.body[field]) {
                throw new Error(`Field ${field} is required`);
            }
        });
    }
    async create(data) {
        return await data_source_1.AppDataSource.transaction(async (manager) => {
            const userRepository = manager.getRepository(User_1.User);
            const existingEmail = await userRepository
                .createQueryBuilder("user")
                .where("LOWER(user.email) = LOWER(:email)", { email: data.email })
                .andWhere("user.isDeleted = false")
                .getOne();
            if (existingEmail) {
                throw new Error("Email already exists");
            }
            if (data.password) {
                const salt = await bcryptjs_1.default.genSalt(10);
                data.password = await bcryptjs_1.default.hash(data.password, salt);
            }
            const token = this.generateToken(data.email);
            const refreshToken = await this.generateRefreshToken(data.email);
            const user = userRepository.create(Object.assign(Object.assign({}, data), { refreshToken, isDeleted: false }));
            await userRepository.save(user);
            const completeUser = await userRepository.findOne({
                where: { id: user.id },
            });
            const userResponse = this.mapUserToResponse(completeUser);
            userResponse.token = token;
            userResponse.refreshToken = refreshToken;
            return userResponse;
        });
    }
    mapUserToResponse(user) {
        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            isDeleted: user.isDeleted,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        };
    }
    generateToken(email) {
        return (0, jsonwebtoken_1.sign)({ email }, process.env.JWT_SECRET || "default-secret", {
            expiresIn: "1h",
        });
    }
    async generateRefreshToken(email) {
        const refreshToken = (0, jsonwebtoken_1.sign)({ email }, process.env.REFRESH_TOKEN_SECRET || "default-refresh-secret", { expiresIn: "15d" });
        return refreshToken;
    }
}
exports.default = new UserService();
