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
        const response = await organizationModel.find();
        return response;
    }

    public deleteOrganization = async(id: String) => {
        const response = await organizationModel.findByIdAndDelete({_id: id});
        return response;
    }
}

export default organizationDao;