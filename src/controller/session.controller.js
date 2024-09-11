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
export const authenticate = async (req,res) => {
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    try{
        //revisar si el usario existe en la BD
        const user = await getUserLogin(result.data)
        //crear sessionid y se lo manda al user por la cookie
        const sessionId = nanoid()
        res.cookie('sessionId',sessionId,{
            httpOnly: true})
        //almacenar la sessionid del user en BD
        await addSession({sessionId: sessionId, userId: user._id})
        res.status(200).json({sessionId: sessionId, userId: user._id})
    }
    catch(error){ res.status(400).json({error:error.message})}
  
}
//primero hacer un login y luego el authorize
export const authorize = async (req,res) => {
    try{
        const {cookies} = req //en toda peticion del user se manda la cookie si esta autenticado
        console.log(cookies);
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
        //delete sessionUser of database and delete cookie
        if(cookies.sessionId){
            await deleteSession(cookies.sessionId)
            res.cookie('sessionId', '')
            res.status(200).json({success : 'delete session od database'})
        }
        else{
            res.status(200).json({success:'there is not sesiondId'})
        }
        
    }
    catch(error){res.status(400).json({error:error.message})}
}