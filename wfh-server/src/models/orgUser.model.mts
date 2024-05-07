import mongoose from "mongoose";

const orgUserSchema = new mongoose.Schema({
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
    org :{
        type:String,
        required: true
    },
    dob :{
        type:String,
        required: true
    },
    doj :{
        type:String,
        required: true
    },
    isVerified :{
        type: Boolean,
        required: true
    }

}, {timestamps:true});

const orgUser = mongoose.model('OrgUser', orgUserSchema);

export {orgUser};