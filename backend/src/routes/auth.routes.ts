import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Token from '../middlewares/Token';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login.bind(AuthController) as any);
authRoutes.get('/me', Token.authorize.bind(Token) as any, AuthController.me.bind(AuthController) as any);

export { authRoutes };