import {Router} from 'express';
import {setProfile,setPanelControll,logout,editProfile} from '../controller/user.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js';
export const userRouter = Router()

//request render view when user is login
userRouter.get('/profile',verifyToken,setProfile)
userRouter.get('/panel',verifyToken,setPanelControll)
//only request when user is login
userRouter.post('/logout',verifyToken,logout)
userRouter.post('/',verifyToken,editProfile)


