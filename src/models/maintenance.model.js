import { Schema, model } from "mongoose";

const maintenanceSchema = new Schema({
    vehicle:{
        type:Schema.Types.ObjectId,
        ref: "Vehicle",
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        emum:["PENDING","PROSECUTION","FINISHED"],
        default:"PENDING"
    },
    worker:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    cost:{
        type:Number
    }
},{timestamps:true});
export default model("maintenance", maintenanceSchema);