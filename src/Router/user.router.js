import {Router} from 'express';
import {setProfile,setPanelControll} from '../controller/user.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js';
export const userRouter = Router()

//render view when user is login
userRouter.get('/profile',verifyToken,setProfile)
userRouter.get('/panel',verifyToken,setPanelControll)


