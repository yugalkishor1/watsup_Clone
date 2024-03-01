import express from "express"
import {createMsg,getAllMsg} from "../controller/messageController.js"

const messageRouter = express.Router()


messageRouter.post("/createMsg",createMsg)
messageRouter.post("/getAllMsg",getAllMsg)

export default messageRouter

