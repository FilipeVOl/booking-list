import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

// Realiza login do usuario
class AuthController {
    public static async login(req: Request, res: Response): Promise<Response> {
        try {
            // Valida os dados de login
            AuthService.validateLogin(req);
            const auth = await AuthService.login(req.body);

            return res.status(200).json(auth);
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }

    // Retorna os dados do perfil do usuario atual
    public static async me(req: Request, res: Response): Promise<Response> {
        try {
            const user = await AuthService.getProfile(req.body.email);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }
}

export default AuthController;
