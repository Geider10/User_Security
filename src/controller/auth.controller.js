import jsonwebtoken from 'jsonwebtoken';
import {validateUser} from '../schema/user.schema.js';
import {registerUser,loginUser} from '../model/mongodb/mongo.model.js';
import dotenv from 'dotenv';
dotenv.config()

export const register = async (req,res)=>{
    //valida los datos ingresados
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    //el usuario recibe bien/mal y ejecuta una accion
    try{
        const userData = await registerUser(result.data)
        res.status(202).json(userData)
    }
    catch(e){return res.status(400).json({error: e.message})}
}
export const login = async (req,res) => {
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    try{
        const idUser = await loginUser(result.data)
        //crear el token y enviarlo por la cookie
        const token = jsonwebtoken.sign({id: idUser},
            process.env.PRIVATE_KEY,
            {
                expiresIn: '1h'
            })
        res.cookie('access_token',token,{
            httpOnly : true
        })
        res.status(200).json({success: 'login existoso'})
    }
    catch(error){ res.status(400).json({error:error.message})}
  
}
