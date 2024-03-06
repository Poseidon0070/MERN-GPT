import { Router } from "express";
import chatRouter from "./chat.js";
import userRouter from "./user.js";

const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/chat', chatRouter)

export default appRouter