import { organizationUserModel } from "../models/organizationUser.model.js";

class organizationUserDao {
    public findOrganizationUser = async(email: String) => {
        const response = await organizationUserModel.findOne({email: email});
        return response;
    }

    public findOrganizationUserById = async(id: String) => {
        const response = await organizationUserModel.findById(id);
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

    public makeAdmin = async(id: string, value: boolean) => {
        const response = await organizationUserModel.findByIdAndUpdate(id, {isAdmin: !value}, {new:true});
        return response;
    }

    public findAdmin = async(org_name: string) => {
        const response = await organizationUserModel.findOne({org_name: org_name, isAdmin: true});
        return response;
    }
}

export default organizationUserDao;
