import {Router} from 'express';
import {nanoid} from 'nanoid';
import {checkData, checkUser} from '../utils.js';
import {register,autenticar} from '../controller/user.controller.js';
export const sessionRouter = Router()

const sessionList = []//gestionar las sessiones
sessionRouter.get('/')
sessionRouter.post('/register',register)
sessionRouter.post('/autenticar',autenticar)
sessionRouter.get('/profile',(req,res)=>{
    const {cookies} = req//la cookie se manda automatico desde el front luego de la autenticacion
    console.log(cookies);
    if(!cookies.sessionId) return res.status(400).json({result:'there are not cookie'})
    
    const userSession = sessionList.find(s=> s.sessionId == cookies.sessionId)
    if(!userSession) return res.status(400).json({result:'there are not userSession'})

    try{
        const user = checkUser(userSession.id)
        res.status(200).json({result:user})
    }
    catch(e){
        res.status(400).json({result:e.message})
    }
})