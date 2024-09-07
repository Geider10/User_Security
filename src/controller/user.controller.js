import {validatePartialUser} from '../schema/user.schema.js';
import {addUser} from '../model/mongodb/schema.model.js';
export const create = async (req,res)=>{
    //valida los datos
    const result = validatePartialUser(req.body)
    if(!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
    
    //agrego un usuario
    const newUser = await addUser(result.data)

    console.log(newUser);
    res.status(201).json(newUser)
}