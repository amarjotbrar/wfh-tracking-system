import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
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

const organizationModel = mongoose.model('organization', organizationSchema);
export {organizationModel};