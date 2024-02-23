import mongoose from "mongoose"

const messageSchema  =  mongoose.Schema({
    content:{
        type:String,
    },
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel"
    },
    recipient:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel"
    }
},{timestamps:true})

const messageModel = mongoose.model("messageModel", messageSchema)

export default messageModel;