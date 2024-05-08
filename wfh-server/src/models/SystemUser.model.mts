import mongoose from "mongoose";

const SystemUserSchema = new mongoose.Schema({
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
        type:String,
        required: true
    },
    isVerified :{
        type: Boolean,
        required: true
    }
}, {timestamps:true});

const SystemUserModel = mongoose.model('SysUser', SystemUserSchema);

export {SystemUserModel};