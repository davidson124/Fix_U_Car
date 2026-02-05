import { Schema, model } from "mongoose";

//Instantiate the user entity schema

const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    cellphoneNumber: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 6,
        maxlength: 12
    },
    password:{
        type: String,
        required:true,
        minlength: 9
    },
    role:{
        type:String,
        enum: ['ADMIN', 'WORKER', 'USER'],
        default: 'USER'
    },
    profilePhoto:{
        type:String,
        default:null
    }
},
{
    timestamps:true
});

export default model('User',userSchema);