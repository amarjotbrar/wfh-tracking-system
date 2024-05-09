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
})

const OrganizationModel = mongoose.model('Organization', OrganizationSchema);
export {OrganizationModel};