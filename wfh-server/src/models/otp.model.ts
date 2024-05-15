import mongoose from "mongoose";

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
});

const otpModel = mongoose.model('otpModel', otpSchema);

export {otpModel};