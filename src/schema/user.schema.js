import {z} from 'zod';

// Solicita al menos una letra May/ MIN, al menos un numero,  + @ + + la extension minimo tiene 2 caracteres
const regEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
// Solicita al menos una letra May/ MIN, al menos un numero y minomo 8 caracteres
const regPassword = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')

const userSchema = z.object({
    email : z.string().regex(regEmail),
    password : z.string().regex(regPassword)
})

export const validateUser = (object) =>{
    return userSchema.safeParse(object)//necesita recibir todos los atributos del esquema o 404
}
export const validatePartialUser = (object)=>{//post user
    return userSchema.partial().safeParse(object)//es opcional que reciba todos los atributos para validar
}