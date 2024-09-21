import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()

const client = new MongoClient(process.env.MONGO_URI,{
    serverApi:{
        version : ServerApiVersion.v1,
        strict: true,
        deprecationErrors : true
    }
})

export const connectDB= async (collectionName)=>{
    try{
        await client.connect()
        const dataBase = client.db('Manager_User')
        return dataBase.collection(collectionName)
    }
    catch (error){
        await client.close()
        console.error('error connecting with the database');
    }
}
export const closeDB = async()=>{
    try{
        await client.close()
    }
    catch(e){
        console.error('error closing connection with the database');
    }
}
//convierte el str en objectId
export const convertObjectId = (value)=>{
    const objectId = new ObjectId(value)
    return objectId
}