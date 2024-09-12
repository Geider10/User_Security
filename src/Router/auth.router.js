import {Router} from 'express';
export const authRouter = Router()
const checkData = (email,password) => {}
//Endpoint para todo usuario
authRouter.get('/',(req,res)=>{
    res.sendStatus(200)
    console.log("req get")
})
//Endpoint autenticado para todo usuario registrado
authRouter.post('/autenticado', async(req,res)=>{
    const {email, password} = req.body
    try{
        await checkData(email,password)
        res.send({message: 'user autenticado'})
    }
    catch (e){
        res.sendStatus(400)
    }
})
//Endpoint autorizado solo para admin
authRouter.post('/autorizado', async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await checkData(email,password)
        if(user.roles  != 'admin') return res.sendStatus(400)
        res.send({message:'admin autorizado'})
    }
    catch(err){
        res.sendStatus(400)
    }
})
