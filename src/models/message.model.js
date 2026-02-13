import mongoose, { Schema, model } from "mongoose";
const messageSchema=new Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    read:{
        type: Boolean,
        default: false
    },
    type:{
        type:String,
        enum:['USER_MESSAGE', 'ADMIN_NOTIFICATION'],
        default:'USER_MESSAGE'
    }
},{timestamps:true});
export default model("Message", messageSchema);