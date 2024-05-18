import wfhRequestModel from "../models/wfhRequest.model.js";

class wfhRequestDao {
    public showRequests = async (org_name: String) => {
        console.log(org_name);
        const response = await wfhRequestModel.find({org_name: org_name});
        console.log(response);
        return response;
    }

    public createWfhRequest = async(reqData: wfhRequestData) => {
        const response = await wfhRequestModel.create(reqData);
        return response;
    }

    public approveRequest = async(id: string) => {
        const response = await wfhRequestModel.findByIdAndUpdate(id, {isApproved: "Approved"}, {new: true});
        return response;
    }

    public rejectRequest = async(id: string, reason: string) => {
        const response = await wfhRequestModel.findByIdAndUpdate(id, {isApproved: "Rejected", details: reason}, {new: true});
        return response;
    }
}

export default wfhRequestDao;