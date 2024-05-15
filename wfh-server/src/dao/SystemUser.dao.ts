import { systemUserModel } from "../models/systemUser.model.js";

class systemUserDao {
    public findSystemUser = async (email: String) => {
        const response = await systemUserModel.findOne({email: email});
        return response;
    }

    public createSystemUser = async(userData: systemUser) => {
        const response = await systemUserModel.create(userData);
        return response;
    }
}

export default systemUserDao;