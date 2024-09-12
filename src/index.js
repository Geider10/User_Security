import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js';
import {authRouter} from './router/auth.router.js';
import {sessionRouter} from './router/session.router.js';
import {viewRouter} from './router/view.router.js';
const app = express()
const PORT = process.env.PORT || 8080

app.use(cookieParser())//permite leer el contenido de la cookies en la peticion
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/auth",authRouter)
//las peticiones estan en unas rutas
app.use("/session",sessionRouter)
//las view se renderizan en otras rutas
app.use('/view',viewRouter)

app.listen(PORT,()=> console.log("se levanto el server"))