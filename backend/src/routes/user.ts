import { Router } from "express";
import { addUser, getAllUsers } from "../controllers/user-controller.js";
import validateSignup from "../utils/user-validator.js";
import validationRequestSchama from "../utils/validate-request-schema.js";

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.post('/',validateSignup, validationRequestSchama, addUser)

export default userRouter