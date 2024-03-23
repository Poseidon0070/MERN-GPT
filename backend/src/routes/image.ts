import { Router } from "express";
import { verifyToken } from "../utils/auth-token.js";
import { generateImage } from "../controllers/image-controller.js";

const imageRouter = Router()

// chatRouter.post('/new', verifyToken, generateChatCompletion)
imageRouter.get('/',verifyToken, generateImage)

export default imageRouter