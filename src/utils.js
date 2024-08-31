import {users} from './DB/users.js';
export const checkData=(email,password)=>{
    if(!email || !password) throw new Error("Data null")
    const user = users.find(u => u.email == email)
    if(!user) throw new Error("there are not user")
    if(user.password != password) throw new Error("Incorrect pass")
    return user
}