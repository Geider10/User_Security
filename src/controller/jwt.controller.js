import jsonwebtoken from 'jsonwebtoken';
import {validateUser} from '../schema/user.schema.js';
import {addUser,getUserLogin,getUserById,deleteSession} from '../model/mongodb/mongo.model.js';
export const register = async (req,res)=>{
    //valida los datos ingresados
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    
    const newUser = await addUser(result.data)
    res.status(201).json(newUser)
}
export const login = async (req,res) => {
    const result = validateUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    try{
        const user = await getUserLogin(result.data)
        //crear token and enviarlo por el cookie
        const token = jsonwebtoken.sign({id: user.id},
            process.env.PRIVATE_KEY,
            {
                expiresIn: '1h'
            })
        console.log(token);
        res.cookie('token',token,{
            httpOnly : true,
            secure: process.env.NODE_EVN == 'production', 
            sameSite : 'strict', 
            maxAge: 1000 * 60 * 60 
        })
        res.status(200).json({userId: user._id})
    }
    catch(error){ res.status(400).json({error:error.message})}
  
}
//hacer login y luego un autorizado
export const authorize = async (req,res) => {
    try{
        const {cookies} = req
        if(!cookies.access_token) return res.status(400).send('there is not token in the cookie')
        const data = jsonwebtoken.verify(cookies.access_token, process.env.PRIVATE_KEY)
        const user = await getUserById(data.userId)
        //dar acceso a cierto contenido segun el rol del user
        res.status(200).json(user)
    }
    catch(error){res.status(400).json({error: error.message})}
}
export const logout = async (req,res) =>{
    try{
        const {cookies} = req
        if(!cookies.sessionId) return res.status(400).send('there is not token in the cookie')
        //delete sessionUser of database and delete cookie
        await deleteSession(cookies.sessionId)
        res.clearCookie('access_token')
        res.status(200).send('delete token')
    }
    catch(error){res.status(400).json({error:error.message})}
}