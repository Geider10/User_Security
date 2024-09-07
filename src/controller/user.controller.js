import {nanoid} from 'nanoid';
import {encryptPassword,setRol} from '../utils.js';

const addUser =(user)=>{
    const {name, password} = user
    const newUser={
        id: nanoid(),
        name : name,
        password : encryptPassword(password),
        rol: setRol()
    }
    
}
export const userRegister = async(req,res)=>{
    const {email, password} = req.body
    res.status(201).json({success:'se agrego un nuevo registro'})
}