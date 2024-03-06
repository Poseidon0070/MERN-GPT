import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    role : {
        type : String,
        require : true
    },
    content : {
        type : String,
        require : true 
    },
    chats : []
})

export default chatSchema