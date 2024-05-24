import { organizationModel } from "../models/organization.model.js";

class organizationDao {
    public findOrganization = async(org_name: String) =>{
        const response = await organizationModel.findOne({org_name});
        return response;
    }

    public createOrganization = async( { org_name, name, maxWfhDays, isActive }: orgType) => {
        org_name = org_name.toLowerCase();
        const response = await organizationModel.create({ org_name, name, maxWfhDays , isActive});
        return response;
    }

    public showAllOrganizations = async() => {
        const response = await organizationModel.find({isActive:true});
        return response;
    }

    public deliveOrganization = async(id: String) => {
        const response = await organizationModel.findByIdAndUpdate(id,{isActive:false});
        return response;
    }

    public makeOrganizationLive = async({id, name, maxWfhDays}: makeOrganizationLiveData) => {
        const response = await organizationModel.findByIdAndUpdate(id, {maxWfhDays: maxWfhDays, name: name,isActive: true});
        return response;
    }

    public checkStatus = async(org_name: String) => {
        const response = await organizationModel.findOne({org_name: org_name});
        if(response?.isActive === true) return true;
        else return false;
    }
}

export default organizationDao;