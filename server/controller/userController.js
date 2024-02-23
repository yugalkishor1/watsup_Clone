import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {

        const user = await userModel.findOne({email});

        if(user){
            const passwordMatch = await bcrypt.compare(password,user.password)
            
            if(passwordMatch){
                return res.json({status:true,msg:`${user.username} succesfully logged in`})
            }else{
                return res.json({status:false,msg:"Incorrect Password"})
            }
        }else{
            return res.json({status:false,msg:"Invalid email"})
        }

    } catch (error) {
        res.json(error.message)
    }

}

export const registerUser = async(req,res)=>{

    const {username,email,password} = req.body;
    console.log(req.body);
    try {

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await userModel.create({username,email,password:hashedPassword})

        return res.json({status:true,msg:`${user.username} successfully Registered`})

    } catch (error) {
        res.json(error.message)
    }

}