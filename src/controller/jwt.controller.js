import jsonwebtoken from 'jsonwebtoken';
import {validateUser} from '../schema/user.schema.js';
import {addUser,getUserLogin,getUserByEmail,} from '../model/mongodb/mongo.model.js';
import dotenv from 'dotenv';
dotenv.config()

export const register = async (req,res)=>{
    //valida los datos ingresados
    const body = req.body
    if(!body) return res.status(400).json({error : 'empty body request'})
    const result = validateUser(body)
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
        //crear token and enviarlo por el cookie
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
        res.status(200).send('Good login')
        // res.status(200).json({id: user._id})
    }
    catch(error){ res.status(400).json({error:error.message})}
  
}
//hacer login y luego un autorizado
export const authorize = async (req,res) => {
    try{
        const token = req.cookies.access_token
        if(!token) return res.status(400).send('there is not token in the cookie')
        const data = jsonwebtoken.verify(token, process.env.PRIVATE_KEY)
        const user = await getUserByEmail(data.email)
        //dar acceso a cierto contenido segun el rol del user
        res.status(200).json(user)
    }
    catch(error){res.status(400).json({error: error.message})}
}
export const logout = async (req,res) =>{
    try{
        const {cookies} = req
        if(!cookies.access_token) return res.status(400).send('there is not token in the cookie')
        res.clearCookie('access_token')
        res.status(200).send('delete token')
    }
    catch(error){res.status(400).json({error:error.message})}
}