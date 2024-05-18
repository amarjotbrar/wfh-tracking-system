import mongoose from "mongoose";
import { boolean } from "zod";

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

    isActive:{
        type: Boolean,
        required: true
    }
})

const organizationModel = mongoose.model('organization', organizationSchema);
export {organizationModel};