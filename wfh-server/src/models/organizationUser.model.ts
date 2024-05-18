import mongoose from "mongoose";

const organizationUserSchema = new mongoose.Schema({
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
        required:true
    },
    org_name :{
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

    isAdmin:{
        type: Boolean,
        required: true
    },

    isVerified :{
        type: Boolean,
        required: true
    }

}, {timestamps:true});

const organizationUserModel = mongoose.model('organizationUser', organizationUserSchema);

export {organizationUserModel};