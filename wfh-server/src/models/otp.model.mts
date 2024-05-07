import { timeStamp } from "console";
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    otp:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required:true,
        get: (createdAt: Date) => createdAt.getTime(),
        set: (createdAt: Date) => new Date(createdAt)
    }
});

const otpModel = mongoose.model('otpModel', otpSchema);

export {otpModel};