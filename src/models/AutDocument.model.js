import {Schema, model}from'mongoose';
const CarDocumentSchema = new Schema({
    vehicle:{
        tupe:String,
        ref:"Vehicle",
        required: true
    },
    name:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum: ["MANUAL", "POLICY", "OTHER"],
    },
},{timestamps:true});
export default model('AutDocument', CarDocumentSchema);