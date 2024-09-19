import {Router} from 'express';
import {index,register,login,profile,panelUser} from '../controller/view.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js';
export const viewRouter = Router()

//no necesita el token
viewRouter.get('/',index)
viewRouter.get('/register',register)
viewRouter.get('/login',login)
//necesita el token, router user, accede a las view cuando esta logiado
viewRouter.get('/profile',verifyToken,profile)
viewRouter.get('/panel',verifyToken,panelUser)

