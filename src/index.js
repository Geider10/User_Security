import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import {authRouter} from './router/auth.router.js';
import {sessionRouter} from './router/session.router.js';
const app = express()
const PORT = process.env.PORT || 8080

app.use(cookieParser())//permite leer las cookies de los usuarios
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use("/auth",authRouter)
app.use("/session",sessionRouter)

app.listen(PORT,()=> console.log("se levanto el server"))