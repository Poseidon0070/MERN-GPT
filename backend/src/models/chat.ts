import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

export default chatSchema