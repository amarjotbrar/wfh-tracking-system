import { SystemUserModel } from "../models/SystemUser.model.mjs";

class SystemUserDao {
    public CreateSystemUser = async (userData : SystemUser): Promise<[number, any]> => {
        try{
            const userAdded = await SystemUserModel.create(userData);
            return [200, userAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }
}

export default SystemUserDao;