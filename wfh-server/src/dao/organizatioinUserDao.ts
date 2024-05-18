import { organizationUserModel } from "../models/organizationUser.model.js";

class organizationUserDao {
    public findOrganizationUser = async(email: String) => {
        const response = await organizationUserModel.findOne({email: email});
        return response;
    }

    public createOrganizationUser = async(userData: organizationUser) =>{
        const response = await organizationUserModel.create(userData);
        return response;
    }

    public findUsers = async(org_name: String) => {
        const response = await organizationUserModel.find({org_name: org_name});
        return response;
    }

    public findLink = async(email: String, org_name: String) => {
        const response = await organizationUserModel.findOne({email: email, org_name: org_name});
        return response;
    }

    public makeAdmin = async(id: string) => {
        const response = await organizationUserModel.findByIdAndUpdate(id, {isAdmin: true}, {new:true});
        return response;
    }
}

export default organizationUserDao;
