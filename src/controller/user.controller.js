//de la peticion traer la cookie para obtener los datos y mandarselo a la vista
import {getUserByEmail,getAllUser} from '../model/mongodb/mongo.model.js';
export const setProfile = async (req,res)=>{
    const emailUser = req.params.userId
    try{
        const user = await getUserByEmail(emailUser)
        res.render('profile',{user})
    }
    catch (e){ 
        res.json({error: error.message})
    }
}
export const setPanelControll = async (req,res)=>{
    const emailUser = req.params.userId
    try{
        const user = await getUserByEmail(emailUser)
        if(user.rol == 'admin'){
            const allUsers = await getAllUser()
            res.render('panelUser',{allUsers})
        }
        else{
            res.render('panelUser',{})
        }
    }
    catch(e){
        res.json({error: error.message})
    }
}
export const setLogout = async (req,res) =>{
    try{
        const {cookies} = req
        //not token return a response from router
        if(!cookies.access_token) return res.status(400).send('there is not token in the cookie')
        res.clearCookie('access_token')
        res.status(200).json({success: 'delete access_token'})
    }
    catch(error){res.status(400).json({error:error.message})}
}