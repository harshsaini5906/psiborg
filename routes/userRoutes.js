import express from "express"
import {superAdminRegister ,restUserRegister,userLogin,userDetail} from '../controllers/userController.js'
import { authenticateToken} from "../middleware/middlewareFunction.js"
const userRoute=express.Router()

userRoute.post("/superAdminRegister",superAdminRegister);
userRoute.post("/restUserRegister",restUserRegister);
userRoute.post("/userLogin",userLogin);
userRoute.get("/userDetail",authenticateToken,userDetail);

export default userRoute;