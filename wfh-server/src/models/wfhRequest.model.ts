import mongoose from "mongoose";

const wfhRequestSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    org_name:{
        type: String,
        required: true,
    },
    requestDate:{
        type: String,
        required: true,
    },
    details: {
        type: String
    },
    isApproved:{
        type: String,
        required: true,
        default: "Pending"
    }
});

const wfhRequestModel = mongoose.model('wfhRequests', wfhRequestSchema);
export default wfhRequestModel;