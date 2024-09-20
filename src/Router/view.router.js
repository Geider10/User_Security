import {Router} from 'express';
export const viewRouter = Router()
//routes for render views
viewRouter.get('/',(req,res)=>{
    res.render('index')
})
viewRouter.get('/register',(req,res)=>{
    res.render('register')
})
viewRouter.get('/login',(req,res)=>{
    res.render('login')
})

