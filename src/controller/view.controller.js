//de la peticion traer la cookie para obtener los datos y mandarselo a la vista
import {getUserByEmail,getAllUser} from '../model/mongodb/mongo.model.js';

export const index = (req,res)=>{
    res.render('index')
}
export const register = (req,res)=>{
    res.render('register')
}
export const login =(req,res)=>{
    res.render('login')
}
export const profile = async (req,res)=>{
    const emailUser = req.params.userId
    try{
        const user = await getUserByEmail(emailUser)
        res.render('profile',{user})
    }
    catch (e){ res.render('profile')}
}
export const panelUser = async (req,res)=>{
    const emailUser = req.params.userId
    try{
        const user = await getUserByEmail(emailUser)
        if(user.rol == 'admin'){
            const allUsers = await getAllUser()
            console.log(allUsers);
            res.render('panelUser',{allUsers})
        }
    }
    catch(e){res.render('panelUser')}
}