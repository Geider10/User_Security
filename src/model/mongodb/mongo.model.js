import {encryptPassword,verifyPassword} from '../../utils.js';
import {connectDB} from './mongoClient.js';

//para registaar no se tiene que repetir el email
const existsUser = async (email)=>{
    const db = await connectDB('users')
    const isUser = await db.findOne({email : email})
    if (isUser) {
        console.log('Email ya esta registrado');
        return true
    }
    else{
        console.log('El email no está registrado');
        return false
    }
}
export const addUser = async(data)=>{
    const {email, password} = data
    const existingUser = await existsUser(email)
    if(!existingUser){
        const newUser= {
            email: email,
            password: await encryptPassword(password),
            rol: 'user'
        }
        const db = await connectDB('users')//hacemos la conexion
        await db.insertOne(newUser)//almacenamos en la BD
        //retorna bien 
        return {success: 'add user in database'}
    }
    else{
        //retorna mal
        return { error : 'the user this in database'}
    }
}
export const getUserLogin = async(data)=>{
    const {email,password} = data
    const db = await connectDB('users')
    const user = await db.findOne({email: email})
    //check if user this in database
    if(!user) throw new Error('There are not user in database ')
    const matchPassword = await verifyPassword(password,user.password)
    if(!matchPassword)  throw new Error('Not match password with the user')
    return user
}
export const getUserByEmail = async (email) =>{
    const db = await connectDB('users')
    const user = await db.findOne({email: email})
    if(!user) throw new Error('there are not user')
    return user
}
export const addSession = async(sessionData)=>{
    const db = await connectDB('session_users')
    await db.insertOne(sessionData)
    console.log(sessionData);
}
export const getSession = async(sId)=>{
    const db = await connectDB('session_users')
    const session = await db.findOne({sessionId: sId})
    if(!session) throw new Error('there are not session of user')
    return session
}

export const deleteSession = async (sId)=>{
    const db = await connectDB('session_users')
    await db.deleteOne({sessionId: sId})
}