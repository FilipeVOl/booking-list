"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const bcryptjs = __importStar(require("bcryptjs"));
async function seedUsers() {
    console.log('Iniciando seed de usuários...');
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const count = await userRepository.count();
        if (count > 0) {
            console.log(`já existem ${count} usuários cadastrados`);
            return;
        }
        const hashedPassword = await bcryptjs.hash("123456", 10);
        const user = userRepository.create({
            name: "joão",
            email: "joao@gmail.com",
            cpf: "12345678901",
            password: hashedPassword,
            isDeleted: false,
        });
        const savedUser = await userRepository.save(user);
        console.log('Usuário criado com sucesso');
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
    finally {
        await data_source_1.AppDataSource.destroy();
        console.log('Conexão com o banco de dados encerrada');
    }
}
;
seedUsers();
