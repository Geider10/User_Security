import {z} from 'zod';

// Acepta letras, números, simbolos, + @ + dominio a full + la extension minimo tiene 2 caracteres
const regEmail = RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
// Acepta letras y números, con una longitud mínima de 8 caracteres
const regPassword = RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$')

const userSchema = z.object({
    email : z.string().regex(regEmail),
    password : z.string().regex(regPassword),
    rol: z.array(
        z.enum(['user','admin']),
        {
            required_error : 'Rol user is required',
            invalid_type_error: 'Rol user must be an array of enum roles'
        }
    )
})

export const validateUser = (object) =>{
    return userSchema.safeParse(object)
}