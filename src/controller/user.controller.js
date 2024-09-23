import {getAllUser,getUserId,editUser} from '../model/mongodb/mongo.model.js';
import sharp from 'sharp';
//obtener el idUser del parms/cookie y render views
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
export const logout = async (req,res) =>{
    const {cookies} = req
    //not token return a response from router
    if(!cookies.access_token) return res.status(400).send('there is not token in the cookie')
    res.clearCookie('access_token')
    res.status(200).json({success: 'delete access_token'})
}
export const editProfile = async (req,res)=>{
    const userId = req.params.userId
    const data = req.body
    try{
        await editUser(userId,data)
        res.status(200).json({success: 'se edito el user'})
    }
    catch(e){ res.status(400).json({error: e.message})}
}
export const changeImg = async(req,res) => {
    try{
        const userId = req.params.userId
        const file = req.file
        if(!file) res.status(400).json({error: 'no se subio archivo'})
        // convertir la img en webp para reducir tamaño
        const compressImg = await sharp(file.buffer)
        .webp({quality : 80})
        .toBuffer()
        // Convertir a base64 para almacenar en MongoDB
        const base64Img = compressImg.toString('base64');
        const imgUrl = `data:${file.mimetype};base64,${base64Img}`;

        await editUser(userId, {img : imgUrl})
        res.status(200).json({success : 'se subio la imagen'})
    }
    catch(e){res.status(400).json({error: e.message})}
}