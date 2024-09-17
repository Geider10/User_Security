//peticion recibir el body y mandarlo a la view
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
    res.render('profile')
}
export const panelUser = (req,res)=>{
    res.render('panelUser')
}