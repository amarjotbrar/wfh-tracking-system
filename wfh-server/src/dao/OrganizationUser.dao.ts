import { organizationUserModel } from "../models/organizationUser.model.js";

class organizationUserDao {
    public createOrganizationUser = async (userData : organizationUser): Promise<[number, any]> => {

        const isEmailAlreadyPresent = async (email: String): Promise<boolean> => {
            const userPresent = await organizationUserModel.findOne({email});
            return !!userPresent;
        }

        if(await isEmailAlreadyPresent(userData.email)) return[401, {error: "User already present."}];

        try{
            const userAdded = await organizationUserModel.create(userData);
            return [200, userAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }
}

export default organizationUserDao;