import 'dotenv/config';
import {encryptPassword} from '../../utils.js';
import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb';
const uri = 'mongodb+srv://Yoel10:yoel2024@dbtesting.lrttm0z.mongodb.net/Manager_User?retryWrites=true&w=majority'

const client = new MongoClient(uri,{
    serverApi:{
        version : ServerApiVersion.v1,
        strict: true,
        deprecationErrors : true
    }
})
async function connectDB() {
    try{
        await client.connect()
        const dataBase = client.db('Manager_User')
        return dataBase.collection('users')
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
        rol: 'user'
    }
    //almacenamos en la BD
    const db = await connectDB()
    const user = await db.insertOne(newUser)
    //retornar solo los datos necesarios al cliente
    return user
}