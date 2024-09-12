import bcrypt from 'bcrypt';
//obtiene la ruta para utilizarla
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
export const __dirname = dirname(fileURLToPath(import.meta.url))

//permite leer archivos json con moduls 
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)//importar y pasar ruta del json

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

export const setRol = ()=>{
    const roles = ['user','admin']
    let r = roles.length
    let rolRandom = Math.floor(Math.random()* r) 
    console.log(roles[rolRandom]);
}


