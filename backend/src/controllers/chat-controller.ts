import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { options } from "../utils/openai-config.js";
import { G4F } from "g4f";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  console.log(message)
  try {
    const g4f = new G4F()
    const user = await User.findById(res.locals.jwtData.id)
    if (!user){
      return res.status(401).json({ msg: "User does not exists with this email."})
    }

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) 
    
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" })

    const chatResponse = await g4f.chatCompletion(chats,options);

    user.chats.push({role:"assistant", "content" : chatResponse});
    await user.save();
    return res.status(200).send({ response : chatResponse })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" })
  }
};