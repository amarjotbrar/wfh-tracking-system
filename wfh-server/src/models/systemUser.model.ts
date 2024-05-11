import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { boolean } from "zod";
const KEY = "1234"

const systemUserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email :{
        type:String,
        unique:true,
        required:true
    },
    dob :{
        type:Date,
        required: true
    },
    isVerified : {
        type: Boolean,
        required: true
    }
}, {timestamps:true});

//generate token

const systemUserModel = mongoose.model('SystemUser', systemUserSchema);

export {systemUserModel};