import mongoose from "mongoose";
import chatSchema from "./chat.js";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true 
    },
    password : {
        type : String,
        require : true
    },
    chats : [chatSchema]
})

export default mongoose.model("User",userSchema);