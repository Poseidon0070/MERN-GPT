import { Request, Response } from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import createToken from "../utils/auth-token.js"

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

const userSignup = async(req : Request, res : Response) => { 
    try{
        let {name, email, password} = req.body
        let ExistingUser = await User.findOne({email : email})
        console.log(ExistingUser)
        if(ExistingUser) {
            return res.status(401).json({message : "User Already Exists with the specified email. Please login.", ExistingUser}) 
        }

        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            name : name,
            email : email,
            password : hashedPassword
        })
        await user.save()

        res.clearCookie("auth_token", { httpOnly: true, path : '/', domain : 'localhost', signed:true }) 
        let token = createToken(user._id.toString(), user.email)
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie('auth_token', token , { httpOnly: true, path : '/', domain : 'localhost', expires: expires, signed:true })

        return res.status(201).json({message : "User Created Successfully", user : user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : err.message})
    }
}

const userLogin = async(req : Request, res : Response) => {
    try {
        let {email, password} = req.body 
        let ExistingUser = await User.findOne({email})
        if(!ExistingUser) {
            return res.status(401).json({message : "User does not exists with the specified email. Please Signup."}) 
        }

        let isPasswordCorrect = await bcrypt.compare(password, ExistingUser.password)
        if (!isPasswordCorrect) {
            return res.status(403).json({message : "Incorrect credentials!"})
        }

        res.clearCookie("auth_token", { httpOnly: true, path : '/', domain : 'localhost', signed:true })
        let token = createToken(ExistingUser._id.toString(), ExistingUser.email)
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie('auth_token', token , { httpOnly: true, path : '/', domain : 'localhost', expires: expires, signed:true })

        return res.status(200).json({message : "Login Successfull", userId : ExistingUser._id})
    } catch (error) {
        
    }
} 
export {getAllUsers, userSignup, userLogin}