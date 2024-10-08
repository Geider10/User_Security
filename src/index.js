import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import cors from 'cors';
import {__dirname} from './utils.js';
import {authRouter} from './Router/auth.router.js';
import {viewRouter} from './Router/view.router.js';
import {userRouter} from './Router/user.router.js';
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())//permite cambiar el content de las cookies
app.use(cors())//permite hacer peticiones entre distintas rutas

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/public'))

app.use('/auth',authRouter)//las request for auth
app.use('/user',userRouter)//view and request for user
app.use('/',viewRouter)//las view for auth

app.listen(PORT,()=> console.log("se levanto el server"))