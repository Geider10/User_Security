import {Router} from 'express';
// import {register,login,authorize, logout} from '../controller/session.controller.js';
import {register,login,logout} from '../controller/jwt.controller.js';
export const sessionRouter = Router()

sessionRouter.get('/', (req,res)=> console.log('get'))
sessionRouter.post('/register', register)
sessionRouter.post('/login', login)
sessionRouter.post('/logout', logout)