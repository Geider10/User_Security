import jsonwebtoken from 'jsonwebtoken';
import {validateUser} from '../schema/user.schema.js';
import {addUser,getUserLogin} from '../model/mongodb/mongo.model.js';
import dotenv from 'dotenv';
dotenv.config()

export const register = async (req,res)=>{
    //valida los datos ingresados
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    //el usuario recibe bien/mal y ejecuta una accion
    const userData = await addUser(result.data)
    res.status(202).json(userData)
    
}
export const login = async (req,res) => {
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    try{
        const user = await getUserLogin(result.data)
        //crear el token y enviarlo por la cookie
        const token = jsonwebtoken.sign({email: user.email},
            process.env.PRIVATE_KEY,
            {
                expiresIn: '1h'
            })
        res.cookie('access_token',token,{
            httpOnly : true,
            secure: process.env.NODE_EVN == 'production',
            sameSite : 'strict'
        })
        res.status(200).json({success: 'login existoso'})
    }
    catch(error){ res.status(400).json({error:error.message})}
  
}
