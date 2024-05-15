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
}

export default organizationUserDao;
