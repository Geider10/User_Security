import express from 'express';
import 'dotenv/config';
import {authRouter} from './Router/auth.router.js';

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/auth",authRouter)

app.listen(PORT,()=> console.log("se levanto el server"))