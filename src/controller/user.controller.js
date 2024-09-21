//obtener el idUser del parms/cookie y render views
import {getAllUser,getUserId} from '../model/mongodb/mongo.model.js';
export const setProfile = async (req,res)=>{
    const idUser = req.params.userId
    try{
        const user = await getUserId(idUser)
        res.render('profile',{user})
    }
    catch (e){ 
        res.json({error: e.message})
    }
}
export const setPanelControll = async (req,res)=>{
    const idUser = req.params.userId
    try{
        const user = await getUserId(idUser)
        if(user.rol == 'admin'){
            const allUsers = await getAllUser('user')
            if(allUsers.length >= 1){
                res.render('panelUser',{allUsers})
            }
            else{
                const noUsers =  true
                res.render('panelUser',{noUsers})
            }
        }
        else{
            const noAdmin = true
            res.render('panelUser', {noAdmin})
        }
    }
    catch(e){
        res.json({error: e.message})
    }
}
//solo peticiones
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