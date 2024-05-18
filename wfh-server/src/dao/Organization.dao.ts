import { organizationModel } from "../models/organization.model.js";

class organizationDao {
    public findOrganization = async(org_name: String) =>{
        const response = await organizationModel.findOne({org_name});
        return response;
    }

    public createOrganization = async(organizationData: orgType) => {
        const response = await organizationModel.create(organizationData);
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

    public makeOrganizationLive = async(id: String) => {
        const response = await organizationModel.findByIdAndUpdate(id, {isActive: true});
        return response;
    }
}

export default organizationDao;