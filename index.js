import express, { json, urlencoded } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { Book } from "./models/bookmodel.js"
import booksRoutes from "./routes/booksRoute.js"
import cors from "cors"

const PORT=5050

const app=express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
    cors({
        origin:"http://localhost:3000",
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-type']
    })
)
app.use("/books",booksRoutes)

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("DB connected successfully")
    app.listen(PORT,()=>{
        console.log(`The server started successfully ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})