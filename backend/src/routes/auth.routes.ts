import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login.bind(AuthController));