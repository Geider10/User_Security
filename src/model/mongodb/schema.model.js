import dotenv from 'dotenv';
dotenv.config()
import {encryptPassword,verifyPassword} from '../../utils.js';
import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI,{
    serverApi:{
        version : ServerApiVersion.v1,
        strict: true,
        deprecationErrors : true
    }
})
async function connectDB(collectionName) {
    try{
        await client.connect()
        const dataBase = client.db('Manager_User')
        return dataBase.collection(collectionName)
    }
    catch (error){
        console.error('Error conecting to the database');
        console.error(error);
        await client.close()
    }
}
export const addUser = async(data)=>{
    const {email, password} = data
    const newUser= {
        email: email,
        password: encryptPassword(password),
        rol: 'admin'
    }

    const db = await connectDB('users')//hacemos la conexion
    await db.insertOne(newUser)//almacenamos en la BD
    //retornar solo los datos necesarios al cliente
    return {...newUser }
}
export const getUser = async(data)=>{
    const {email,password} = data
    const db = await connectDB('users')
    const user = await db.findOne({email: email})
    //check if user this in database
    if(!user) throw new Error('There are not user in database ')
    const matchPassword = verifyPassword(password,user.password)
    if(!matchPassword)  throw new Error('Not match password with the user')
    return user
}
export const addSession = async(data)=>{
    const db = await connectDB('session_users')
    await db.insertOne(data)
    console.log(data);
}