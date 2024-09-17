import {Router} from 'express';
import {index,register,login,profile} from '../controller/view.controller.js';
export const viewRouter = Router()

viewRouter.get('/',index)
viewRouter.get('/register',register)
viewRouter.get('/login',login)
viewRouter.get('/profile',profile)