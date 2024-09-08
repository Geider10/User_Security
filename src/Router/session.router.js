import {Router} from 'express';
import {register,autenticar,accessUser} from '../controller/user.controller.js';
export const sessionRouter = Router()

sessionRouter.get('/')
sessionRouter.post('/register',register)
sessionRouter.post('/autenticar',autenticar)
sessionRouter.get('/profile',accessUser)