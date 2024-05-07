const mongoose = require("mongoose");

//creating Schema
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
    organization :{
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
    }

}, {timestamps:true});

//creating model

const orgUser = mongoose.model('User', orgUserSchema);
module.exports = orgUser;