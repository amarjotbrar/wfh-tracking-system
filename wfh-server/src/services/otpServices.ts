import otpDao from "../dao/otp.dao.js";
import systemUserDao from "../dao/systemUser.dao.js";
import organizationUserDao from "../dao/organizatioinUserDao.js";
import organizationDao from "../dao/organization.dao.js";
import generateOtp from "../utils/otpGenerator.js";
import sendMail from "../utils/sendMail.js";

class otpServices {
    private otpDaoInstance = new otpDao();
    private systemUserDaoInstance = new systemUserDao();
    private organizationUserDaoInstance = new organizationUserDao();
    private organizationDaoInstance = new organizationDao();

    public sendSystemOtp = async (email: string): Promise<[number, any]> => {
        try {
            const preuser = await this.systemUserDaoInstance.findSystemUser(email);
            if (!preuser) {
                return [400, { error: "This user does not exist" }];
            }
    
            const otp = generateOtp();
    
            let existEmail = await this.otpDaoInstance.findUserOtp(email);
    
            if (existEmail) {
                await this.otpDaoInstance.updateOtp(email, otp);
            } else {
                await this.otpDaoInstance.createOtp(email,otp);
            }
    
            try {
                const response = sendMail(email, otp);
                return [200, { message: "Email sent successfully" }];
            } catch (error) {
                return [400, {error: error}];
            }
    
        } catch (error) {
            console.error(error);
            return [400, { error: "Invalid Details" }];
        }
    };

    public sendOrganizationOtp = async (email: string, org_name: string): Promise<[number, any]> => {
        try {
            const preuser = await this.organizationUserDaoInstance.findOrganizationUser(email);
            if (!preuser) {
                return [400, { error: "This user does not exist" }];
            }

            const organizationExist = await this.organizationDaoInstance.findOrganization(org_name);
            if (!organizationExist) {
                return [400, { error: "This Organization does not exist" }];
            }
            else if (preuser.org != org_name){
                return[400, {error: "No such user in this organization!"}];
            }
    
            const otp = generateOtp();
    
            let existEmail = await this.otpDaoInstance.findUserOtp(email);
    
            if (existEmail) {
                await this.otpDaoInstance.updateOtp(email, otp);
            } else {
                await this.otpDaoInstance.createOtp(email,otp);
            }
    
            try {
                const response = sendMail(email, otp);
                return [200, { message: "Email sent successfully" }];
            } catch (error) {
                return [400, {error: error}];
            }
    
        } catch (error) {
            console.error(error);
            return [400, { error: "Invalid Details" }];
        }
    };
}

export default otpServices;