import {Router} from 'express';
import {register,authenticate,authorize} from '../controller/user.controller.js';
export const sessionRouter = Router()

sessionRouter.get('/')
sessionRouter.post('/register',register)
sessionRouter.post('/autenticar',authenticate)
sessionRouter.get('/profile',authorize)