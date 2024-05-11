import mongoose from "mongoose";

const wfhRequestSchema = new mongoose.Schema({
    requestBy:{
        type: String,
        required: true,
    },
    organization:{
        type: String,
        required: true,
    },
    requestDate:{
        type: Date,
        required: true,
    },
    isApproved:{
        type: String,
        required: true
    }
});

const wfhRequestModel = mongoose.model('wfhRequests', wfhRequestSchema);
export default wfhRequestModel;