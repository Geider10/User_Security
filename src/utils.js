import bcrypt from 'bcrypt';
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
export const checkUser=(id)=>{
    const user = users.find(u=> u.id == id)
    if(!user) throw new Error('There are not user')
    return user
}
export const encryptPassword =  (password) =>{
    const salt = bcrypt.genSaltSync(10)
    const hashPassword= bcrypt.hashSync(password,salt)
    return hashPassword
}
export const verifyPassword = (password, hashPassword) =>{
    return bcrypt.compareSync(password,hashPassword)//true o false
}
const roles = ['user','admin']
export const setRol = ()=>{
    let r = roles.length
    let rolRandom = Math.floor(Math.random()* r) 
    console.log(roles[rolRandom]);
}


