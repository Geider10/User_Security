import {Router} from 'express';
import {setProfile,setPanelControll,logout,editProfile,changeImg} from '../controller/user.controller.js';
import {verifyToken} from '../middleware/auth.middleware.js';
import {uploadImg} from '../middleware/upload.middleware.js';
export const userRouter = Router()

//request render view when user is login
userRouter.get('/profile',verifyToken,setProfile)
userRouter.get('/panel',verifyToken,setPanelControll)
//only request when user is login
userRouter.post('/logout',verifyToken,logout)
userRouter.post('/',verifyToken,editProfile)
userRouter.post('/img',verifyToken,uploadImg.single('avatar'),changeImg)//recibe un file con su nombre


