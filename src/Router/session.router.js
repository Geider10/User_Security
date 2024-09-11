import {Router} from 'express';
import {register,authenticate,authorize, logout} from '../controller/session.controller.js';
export const sessionRouter = Router()

sessionRouter.get('/',(req,res)=> console.log('get'))
sessionRouter.post('/register',register)
sessionRouter.post('/login',authenticate)
sessionRouter.post('/logout',logout)
sessionRouter.get('/authorize',authorize)