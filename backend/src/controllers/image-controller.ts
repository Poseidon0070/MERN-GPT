import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { chatOptions } from "../utils/openai-config.js";
import { G4F } from "g4f";

export const generateImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        let image = req.params.imageName
        let g4f = new G4F()
        console.log(image)
        const base64Image = await g4f.imageGeneration(image, { 
            debug: true,
            provider: g4f.providers.Prodia,
            providerOptions: {
                height: 1024,
                width: 1024,
                samplingMethod: "SA-Solver"
            }
        });
        res.status(200).json({image : base64Image})	
    }catch(err){
        console.log(err)
        res.status(500).json({error : err})
    }
}