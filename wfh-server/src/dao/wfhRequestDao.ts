import wfhRequestModel from "../models/wfhRequest.model.js";

class wfhRequestDao {
    public showRequests = async (org_name: String, skip: number, limit: number, requestStatus: string) => {
        const response = await wfhRequestModel.find({org_name: org_name, isApproved: requestStatus}).skip(skip).limit(limit);
        console.log(response);
        return response;
    }

    public getNumberOfRequests = async (org_name: String, requestStatus: string) => {
        const response = (await wfhRequestModel.find({org_name: org_name, isApproved: requestStatus})).length;
        return response;
    }

    public showUserRequests = async(org_name: String, email: String) => {
        const response = await wfhRequestModel.find({org_name: org_name, email: email});
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