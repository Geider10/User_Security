import {nanoid} from 'nanoid';
import {validateUser} from '../schema/user.schema.js';
import {addUser,getUser,addSession} from '../model/mongodb/schema.model.js';
import { json } from 'express';
export const register = async (req,res)=>{
    //valida los datos ingresados
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    
    //agrego un usuario
    const newUser = await addUser(result.data)

    console.log(newUser);
    res.status(201).json(newUser)
}
export const autenticar = async (req,res) => {
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    try{
        //revisar si el usario existe en la BD
        const user = await getUser(result.data)
        //crear sessionid y se lo manda al user por el header
        const sessionId = nanoid()
        res.cookie('sessionId',sessionId,{httpOnly: true})
        //almacenar la sessionid en BD
        await addSession({sessionId: sessionId, userId: user._id})
        res.status(200).json({sessionId: sessionId, userId: user._id})
    }
    catch(error){ res.status(400).json({error:error.message})}
  
} 