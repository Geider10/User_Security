import bcrypt from 'bcrypt';
import { error } from 'node:console';
//permite leer archivos json con modulos
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

const users = readJSON('./schema/users.json')//imp y pasamos la ruta y get data

export const checkData=(email,password)=>{
    if(!email || !password) throw new Error("Data null")
    const user = users.find(u => u.email == email)
    if(!user) throw new Error("there are not user")
    if(user.password != password) throw new Error("Incorrect pass")
    return user
}
export const encryptPassword = async (password) =>{
    const salt = bcrypt.genSaltSync(10)
    try{
        const hashPassword= await bcrypt.hash(password,salt)
        return hashPassword
    }
    catch(error){
        throw new Error('Encriptacion fallida')
    }
}
export const verifyPassword = async (password, hashPassword) =>{
    try{
        const match = await bcrypt.compare(password,hashPassword)//true o false
        return match
    }
    catch (e){
        throw new Error('Verificacion fallida')
    }
}
const roles = ['user','admin']
export const setRol = ()=>{
    let r = roles.length
    let rolRandom = Math.floor(Math.random()* r) 
    console.log(roles[rolRandom]);
}


