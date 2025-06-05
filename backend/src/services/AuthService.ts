import { sign } from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { Request } from 'express';
import bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/dto/Auth';

class AuthService {
    // Repositorio de usuarios
    private static userRepository = AppDataSource.getRepository(User);

    // Valida os dados do login
    public static validateLogin(req: Request): void {
        const requiredFields = ['email', 'password'];
        requiredFields.forEach(field => {
            if (!req.body[field]) {
                throw new Error(`${field} is required`);
            }
        });
    }

    // Realiza o login do usuario
    public static async login(data: LoginDTO): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email: data.email } });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user.email);
        const refreshToken = await this.generateRefreshToken(user.email);

        user.refreshToken = refreshToken;
        await this.userRepository.save(user);
        
        const { password, ...userData } = user;

        return {
            ...userData,
            token,
            refreshToken,
        };
    };

    private static generateToken(email: string): string {
        return sign({ email }, process.env.JWT_SECRET || 'default-secret', { expiresIn: '1h' });
    };

    private static async generateRefreshToken(email: string): Promise<string> {
        const refreshToken = sign({ email }, process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret', { expiresIn: '15d' });
        return refreshToken;
    };

}

export default AuthService;
