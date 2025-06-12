"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class Token {
    async authorize(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            console.log('📝 Header de autorização:', authHeader);
            if (!authHeader) {
                console.log('❌ Nenhum token fornecido');
                return res.status(401).json({ message: 'No token provided' });
            }
            const [scheme, token] = authHeader.split(' ');
            console.log('🔑 Scheme:', scheme);
            console.log('🎟️ Token:', token);
            if (!/^Bearer$/i.test(scheme)) {
                console.log('❌ Token mal formatado');
                return res.status(401).json({ message: 'Token malformatted' });
            }
            if (!process.env.JWT_SECRET) {
                console.log('❌ JWT_SECRET não configurado');
                throw new Error('JWT_SECRET not configured');
            }
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            console.log('🔓 Token decodificado:', decoded);
            const email = decoded.email;
            console.log('📧 Email do usuário:', email);
            const user = await UserRepository_1.default.findByEmail(email);
            console.log('👤 Usuário encontrado:', user);
            if (!user) {
                console.log('❌ Usuário não encontrado');
                return res.status(401).json({ message: 'User not found' });
            }
            req.authMail = email;
            req.userId = user.id;
            console.log('✅ Autenticação bem-sucedida');
            console.log('🆔 ID do usuário:', user.id);
            return next();
        }
        catch (error) {
            console.log('❌ Erro na autenticação:', error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    async validate(req, res, next) {
        console.log('🔍 Iniciando validação...');
        return this.authorize(req, res, next);
    }
    async isAdmin(req, res, next) {
        try {
            console.log('👑 Verificando permissões de administrador...');
            const email = req.authMail;
            console.log('📧 Email do usuário:', email);
            if (!email) {
                console.log('❌ Usuário não autenticado');
                return res.status(401).json({ message: 'Usuário não autenticado' });
            }
            const user = await UserRepository_1.default.findByEmail(email);
            console.log('👤 Usuário encontrado:', user);
            if (!user) {
                console.log('❌ Usuário não encontrado');
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }
            return next();
        }
        catch (error) {
            console.log('❌ Erro ao verificar permissões:', error);
            return res.status(500).json({ message: 'Erro ao verificar permissões de administrador' });
        }
    }
}
exports.default = new Token();
