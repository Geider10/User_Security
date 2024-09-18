//importar en los routes que pide el user
import jsonwebtoken from 'jsonwebtoken';
export const verifyToken = (req,res,next) => {
    try{
        const token = req.cookies.access_token
        if(!token) return res.status(400).send('there is not token in the cookie')
        const data = jsonwebtoken.verify(token, process.env.PRIVATE_KEY)
        //sirve para accerdar a la database del controller user, query params
        req.params.userId = data.email
        next()
    }
    catch(error){res.status(400).json({error: error.message})}
}