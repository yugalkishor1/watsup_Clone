import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("mongodb is connected");
    }).catch(()=>{
        console.log("error connecting with mongodb");
    })
    app.use(cors())
app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.json("hello")
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is listing tp the ${process.env.PORT}`);
})