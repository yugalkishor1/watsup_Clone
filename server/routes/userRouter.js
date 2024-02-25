import express from "express"
import {loginUser,registerUser,checkAuth,allUsers} from "../controller/userController.js"

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser)
userRouter.post("/checkAuth",checkAuth)
userRouter.get("/allUsers",allUsers)

export default userRouter;