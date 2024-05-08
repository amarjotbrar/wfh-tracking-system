import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
    org_name: {
        type: String,
        unique: true,
        required: true
    },

    name:{
        type: String, 
        required: true
    },

    maxWfhDays:{
        type: Number,
        required: true
    },

    isVisible:{
        type: Boolean,
        required: true
    }
})

const OrganizationModel = mongoose.model('org', OrganizationSchema);
export {OrganizationModel};