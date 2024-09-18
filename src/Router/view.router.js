import {Router} from 'express';
import {index,register,login,profile,panelUser} from '../controller/view.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js';
export const viewRouter = Router()

viewRouter.get('/',index)
viewRouter.get('/register',register)
viewRouter.get('/login',login)
viewRouter.get('/profile', verifyToken,profile)
viewRouter.get('/panel', verifyToken,panelUser)

