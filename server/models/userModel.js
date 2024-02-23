import mongoose from "mongoose"

const userSchema  =  mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    onlineStatus:{
        type:Boolean,
        default:false
    },
    password:{
        type:String
    },
    lastSeen:{
        type:String,
    },
})

const userModel = mongoose.model("userModel",userSchema)

export default userModel;