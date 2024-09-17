//de la peticion traer la cookie para obtener los datos y mandarselo a la vista
export const index = (req,res)=>{
    res.render('index')
}
export const register = (req,res)=>{
    res.render('register')
}
export const login =(req,res)=>{
    res.render('login')
}
export const profile = (req,res)=>{
    const user = null
    res.render('profile',{user})
}
export const panelUser = (req,res)=>{
    const isAdmin = null
    res.render('panelUser',{isAdmin})
}