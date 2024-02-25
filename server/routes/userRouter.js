import express from "express"
import {loginUser,registerUser,checkAuth} from "../controller/userController.js"

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser)
userRouter.post("/checkAuth",checkAuth)

export default userRouter;