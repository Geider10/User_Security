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
    const user = await getUserByEmail(emailUser)
    console.log(user);
    if(user){
        res.render('profile',{user})
    }
    else{
        res.render('profile',{})
    }
}
export const panelUser = async (req,res)=>{
    const emailUser = req.params.userId
    const user = await getUserByEmail(emailUser)
    if(user.rol == 'admin'){
        const allUsers = await getAllUser()
        console.log(allUsers.documents);
        res.render('panelUser',{allUsers})
    }
    else{
        res.render('panelUser',{allUsers})
    }
}