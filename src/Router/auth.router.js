import {Router} from 'express';
import {register,login,logout} from '../controller/auth.controller.js';
export const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)