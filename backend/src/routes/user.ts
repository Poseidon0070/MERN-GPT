import { Router } from "express";
import { userSignup, getAllUsers, userLogin } from "../controllers/user-controller.js";
import {validateSignup, validateLogin } from "../utils/user-validator.js";
import validationRequestSchama from "../utils/validate-request-schema.js";

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.post('/signup',validateSignup, validationRequestSchama, userSignup)
userRouter.get('/login',validateLogin, validationRequestSchama, userLogin)

export default userRouter