import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

export const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {

        const user = await userModel.findOne({email});

        if(user){
            const passwordMatch = await bcrypt.compare(password,user.password)
            
            if(passwordMatch){

                const token =  jwt.sign({ user }, process.env.SECRET_KEY)

                return res.json({token,status:true,msg:`${user.username} succesfully logged in`})
            }else{
                return res.json({status:false,msg:"Incorrect Password"})
            }
        }else{
            return res.json({status:false,msg:"Invalid email"})
        }

    } catch (error) {
        console.log(error.message);
        res.json({msg:error.message})
    }

}

export const checkAuth = async (req,res)=>{
    try {
        const token = req.body.token;
        if(token){
            const decoded =  jwt.verify(token,process.env.SECRET_KEY)
            if(decoded){
                res.json({status:true,user:decoded.user})
            }else{
                res.json({status:false})
            }
            
        }else{
            return res.json({status:false})
        }
        
    } catch (error) {
        res.json({
            msg:error.message
        })
    }
}


export const registerUser = async(req,res)=>{

    const {username,email,password} = req.body;

    try {

        const userAlready = await userModel.findOne({email})
        
        if(userAlready){
            return res.json({status:false,msg:`${userAlready.email} Already Exsist, Try another Email`})
           
        }else{
            const hashedPassword = await bcrypt.hash(password,10)

            const user = await userModel.create({username,email,password:hashedPassword})
    
            return res.json({status:true,msg:`${user.username} successfully Registered`})

        }
       
    } catch (error) {
        return res.json(error.message)
    }

}