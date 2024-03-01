import messageModel from "../models/messagelModel.js"


export const createMsg = async(req,res) => {

    const {content,sender,recipient} = req.body;

    try {
        const message = await messageModel.create({content,sender,recipient})
        if(message){
            return res.json({status:true,msg:message.content})
        }else{
            res.json({status:false,msg:"something went wrong"})
        }
    } catch (error) {
        res.json({status:false,msg:error.message})
    }
        
         
}

export const getAllMsg = async(req,res) => {
    
    const {senderId,recipientId} = req.body
    console.log(senderId,recipientId);

    try {
        const allMsg = await messageModel.find({$or:[
            {sender:senderId,recipient:recipientId},
            {sender:recipientId,recipient:senderId},
        ]}).sort({createdAt:1})

        console.log("allmsg",allMsg);

        if(allMsg){
            return res.json({status:true,allMsg})
        }else{
            res.json({status:false,msg:"something went wrong"})
        }
    } catch (error) {
        res.json({status:false,msg:error.message})
    }
        
         
}



