import { Request, Response } from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"

const getAllUsers = async(req : Request, res : Response) => {
    try{
        const users = await User.find()
        return res.status(200).json({users : users})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : err.message})
    }
}

const addUser = async(req : Request, res : Response) => {
    try{
        let {name, email, password} = req.body
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            name : name,
            email : email,
            password : hashedPassword
        })
        await user.save()
        return res.status(201).json({message : "User Created Successfully", user : user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : err.message})
    }
}
export {getAllUsers, addUser}