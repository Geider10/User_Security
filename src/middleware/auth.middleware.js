import jsonwebtoken from 'jsonwebtoken';
export const verifyToken = (req,res,next) => {
    try{
        const token = req.cookies.access_token
        if(!token) res.status(400).json({error: 'there is not token'})
        const data = jsonwebtoken.verify(token, process.env.PRIVATE_KEY)
        //sirve para accerdar a la database desde el controller user, query params
        req.params.userId = data.id
        next()
    }
    catch(error){res.status(400).json({error: error.message})}//retorna en error del token en json
}

//funcion para chekiar el rol, si no es admin lanzar un error