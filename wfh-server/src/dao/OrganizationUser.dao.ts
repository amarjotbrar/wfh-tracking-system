import { OrganizationUserModel } from "../models/OrganizationUser.model.mjs";

class OrganizationUserDao {
    public CreateOrganizationUser = async (userData : OrganizationUser): Promise<[number, any]> => {
        try{
            const userAdded = await OrganizationUserModel.create(userData);
            return [200, userAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }
}

export default OrganizationUserDao;