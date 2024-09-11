import {Router} from 'express';
import {register,authenticate,authorize, logout} from '../controller/user.controller.js';
export const sessionRouter = Router()

sessionRouter.get('/',(req,res)=> console.log('get'))
sessionRouter.post('/register',register)
sessionRouter.post('/autenticar',authenticate)
sessionRouter.get('/authorize',authorize)
sessionRouter.get('/logout',logout)