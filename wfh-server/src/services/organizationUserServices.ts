import organizationUserDao from "../dao/organizatioinUserDao.js";
import organizationDao from "../dao/organization.dao.js";
import otpDao from "../dao/otp.dao.js";

class organizationUserServices {
    private organizationUserDaoInstance = new organizationUserDao();
    private organizationDaoInstance = new organizationDao();
    private otpDaoInstance = new otpDao();

    public createOrganizationUser = async (userData : organizationUser): Promise<[number, any]> => {
        const userAlreadyPresent = await this.organizationUserDaoInstance.findOrganizationUser(userData.email);
        if(!!userAlreadyPresent) return[401, {error: "User already present."}];

        try{
            const userAdded = await this.organizationUserDaoInstance.createOrganizationUser(userData);
            return [200, userAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }

    public verifyLogin = async(userLoginData : organizationUserLogin): Promise<[number, any]> => {
        const {email, org_name, otp} = userLoginData;

        try {
            const userPresent = await this.organizationUserDaoInstance.findOrganizationUser(email);
            const organizationPresent = await this.organizationDaoInstance.findOrganization(org_name);

            if(!userPresent)
            {
                return[400, {error: "User not present, Please register First"}];
            }
            else if(!organizationPresent)
            {
                return[400, {error: "Organization not present!"}];
            }
            else if(userPresent.org != org_name)
            {
                return[400, {error: "No such user in this organization!"}];
            }
            else
            {
                const verifyLogin:any = await this.otpDaoInstance.findUserOtp(email);

                if(verifyLogin.otp == otp)
                {
                    return [200, {message: "User verified successfully"}];
                }
                else
                {
                    return [400, {error: "Invalid OTP"}];
                }
            }
        } catch (error) {
            return [400, {error: "No otp for this User!"}];
        }
    }
}

export default organizationUserServices;