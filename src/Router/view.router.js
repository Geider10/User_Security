import {Router} from 'express';
import {register,login,profile} from '../controller/view.controller.js';
export const viewRouter = Router()

viewRouter.get('/register',register)
viewRouter.get('/login',login)
viewRouter.get('/profile',profile)