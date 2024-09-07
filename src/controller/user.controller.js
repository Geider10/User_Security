import {nanoid} from 'nanoid';
import {encryptPassword} from '../utils.js';
import {validatePartialUser} from '../schema/user.schema.js';

export const addUser = (req,res)=>{
    const result = validatePartialUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    
    const {email, password} = result.data 
    const newUser= {
        id : nanoid(),
        email: email,
        password: encryptPassword(password),
        rol: 'user'
    }
    //almacenamos en la BD

    console.log(newUser);
    res.status(201).json(newUser)
}