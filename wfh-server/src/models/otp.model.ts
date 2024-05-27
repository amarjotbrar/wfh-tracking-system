import mongoose from "mongoose";
import { boolean } from "zod";

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    otp:{
        type: String,
        required: true
    },

    isUsed:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

const otpModel = mongoose.model('otp', otpSchema);

export {otpModel};