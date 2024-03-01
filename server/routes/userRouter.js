import express from "express"
import {loginUser,registerUser,checkAuth,allUsers,queryUsers} from "../controller/userController.js"

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser)
userRouter.post("/checkAuth",checkAuth)
userRouter.get("/allUsers",allUsers)
userRouter.post("/queryUsers",queryUsers)

export default userRouter;