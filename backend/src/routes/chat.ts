import { Router } from "express";
import { verifyToken } from "../utils/auth-token.js";
import { generateChatCompletion } from "../controllers/chat-controller.js";
import { verifyUser } from "../controllers/user-controller.js";

const chatRouter = Router()

// chatRouter.post('/new', verifyToken, generateChatCompletion)
chatRouter.post('/new',verifyToken, generateChatCompletion)

export default chatRouter