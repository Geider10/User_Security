import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import {authRouter} from './Router/auth.router.js';
import {sessionRouter} from './Router/session.router.js';
const app = express()
const PORT = process.env.PORT || 8080

app.use(cookieParser())//leer las cookies de las peticiones
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use("/auth",authRouter)
app.use("/session",sessionRouter)

app.listen(PORT,()=> console.log("se levanto el server"))