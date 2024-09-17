import {Router} from 'express';
import {index,register,login,profile,panelUser} from '../controller/view.controller.js';
export const viewRouter = Router()

viewRouter.get('/',index)
viewRouter.get('/register',register)
viewRouter.get('/login',login)
viewRouter.get('/profile',profile)
viewRouter.get('/panel',panelUser)

