import {nanoid} from 'nanoid';
import {validateUser} from '../schema/user.schema.js';
import {addUser,getUserLogin,addSession,getSession,getUserById,deleteSession} from '../model/mongodb/mongo.model.js';

export const register = async (req,res)=>{
    //valida los datos ingresados
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    //agrego un usuario
    const newUser = await addUser(result.data)
    res.status(201).json(newUser)
}
export const login = async (req,res) => {
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    try{
        //revisar si el usario existe en la BD
        const user = await getUserLogin(result.data)
        //crear sessionid y se lo manda al user por la cookie
        const sessionId = nanoid()
        res.cookie('sessionId',sessionId,{
            httpOnly : true,// la cookie solo se puede acceder en el servidor
            secure: process.env.NODE_EVN == 'production', // la cookie solo se puede acceder en https
            sameSite : 'strict', // la cookie solo se puede acceder en el mismo dominio
            maxAge: 1000 * 60 * 60 // la cookie dura 1hs
        })
        //almacenar la sessionid del user en BD
        await addSession({sessionId: sessionId, userId: user._id})
        res.status(200).json({sessionId: sessionId, userId: user._id})
    }
    catch(error){ res.status(400).json({error:error.message})}
  
}
//primero hacer login y luego un autorizado
export const authorize = async (req,res) => {
    try{
        const {cookies} = req //en toda peticion del user se manda la cookie si esta autenticado}
        if (!cookies.sessionId) return res.status(400).send('there is not session in the cookie')
        const sessionUser = await getSession(cookies.sessionId)
        const user = await getUserById(sessionUser.userId)
        //dar acceso a cierto contenido segun el rol del user
        res.status(200).json(user)
    }
    catch(error){res.status(400).json({error: error.message})}

}
//primero hacer un login y luego el logout
export const logout = async (req,res) =>{
    try{
        const {cookies} = req
        if(!cookies.sessionId) return res.status(400).send('there is not session in the cookie')
        //delete sessionId of database and delete cookie
        await deleteSession(cookies.sessionId)
        res.clearCookie('sessionId')
        res.status(200).send('delete session')
    }
    catch(error){res.status(400).json({error:error.message})}
}