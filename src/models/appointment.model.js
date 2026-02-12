import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
    vehicle:{
        type:Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["SCHEDULED","CANCELLED","COMPLETED"],
        default:"SCHEDULED"
    }
},{timestamps:true});
export default model("Appointment", appointmentSchema);