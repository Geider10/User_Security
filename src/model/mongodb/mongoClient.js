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
        console.error('Error conecting to the database');
        console.error(error);
        await client.close()
    }
}
