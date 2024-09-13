import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js';
import {authRouter} from './router/auth.router.js';
import {sessionRouter} from './router/session.router.js';
import {viewRouter} from './router/view.router.js';
import cors from 'cors';
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())//procesa las peticiones en json
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())//permite cambiar el content de las cookies
app.use(cors())

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/public'))

app.use("/auth",authRouter)
//las peticiones estan en unas rutas
app.use("/session",sessionRouter)
//las view se renderizan en otras rutas
app.use('/view',viewRouter)

app.listen(PORT,()=> console.log("se levanto el server"))