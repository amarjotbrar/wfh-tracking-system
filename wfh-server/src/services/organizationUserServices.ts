import organizationUserDao from "../dao/organizatioinUserDao.js";
import organizationDao from "../dao/organization.dao.js";
import otpDao from "../dao/otp.dao.js";
import wfhRequestDao from "../dao/wfhRequestDao.js";
import jwt from "jsonwebtoken";

class organizationUserServices {
    private organizationUserDaoInstance = new organizationUserDao();
    private organizationDaoInstance = new organizationDao();
    private otpDaoInstance = new otpDao();
    private wfhRequestDaoInstance = new wfhRequestDao();

    public createOrganizationUser = async (userData : organizationUser): Promise<[number, any]> => {

        const linkCreation: createLink = {
            email: userData.email,
            org_name: userData.org_name
        }

        const orgPresent = await this.organizationDaoInstance.findOrganization(userData.org_name);
        if(!orgPresent) return [401, {code: 401,data: {error: "No such Organization", response:""}}];
        if(!orgPresent.isActive) return [401, {code: 401, data:{error:"This Organization is InActive!", response:""}}]

        const userAlreadyPresent = await this.organizationUserDaoInstance.findLink(linkCreation.email, linkCreation.org_name);
        if(userAlreadyPresent) return[401, {code:401, data:{error: "User already present!", response:""}}];

        try{
            const userAdded = await this.organizationUserDaoInstance.createOrganizationUser(userData);
            return [200, {code: 200, data:{error: "", response:userAdded}}];
        } catch (error:any){
            return [401, {code: 401, data:{error: error.message, response: ""}}];
        }
    }

    public verifyLogin = async(userLoginData : organizationUserLogin): Promise<[number, any]> => {
        const {email, org_name, otp} = userLoginData;

        try {
            const userPresent = await this.organizationUserDaoInstance.findOrganizationUser(email);
            const organizationPresent = await this.organizationDaoInstance.findOrganization(org_name);
            const linkPresent = await this.organizationUserDaoInstance.findLink(email, org_name);

            if(!userPresent)
            {
                return[400, {code: 400, data:{error: "User not present, Please register First", response:""}}];
            }
            else if(!organizationPresent)
            {
                return[400, {code: 400, data:{error: "Organization not present!", response:""}}];
            }
            else if(!linkPresent)
            {
                return[400, {code: 400, data:{error: "No such user in this organization!", response: ""}}];
            }
            else
            {
                const verifyLogin:any = await this.otpDaoInstance.findUserOtp(email);
                const isAdmin: boolean = linkPresent.isAdmin;
                var userType = 'user';
                if(isAdmin == true) userType = 'admin';
                if(verifyLogin.otp == otp)
                {
                    const token = jwt.sign(
                        {
                            id: verifyLogin._id,
                            email: verifyLogin.email,
                            userType: userType,
                            org_name: linkPresent.org_name
                        },
                        `${process.env.JWTKEY}`,
                        {
                            expiresIn: "1h"
                        }
                    )

                    return [200, {code: 200, data:{error: "", response:{token: token, userType: userType}}}];
                }
                else
                {
                    return [401, {code: 401, data:{error: "Invalid OTP", response: ""}}];
                }
            }
        } catch (error) {
            return [400, {code:401, data:{error: "No otp for this User!", response: ""}}];
        }
    }


    public createRequest = async(reqData: wfhRequestData): Promise<[number, any]> => {
        try{
            const linkPresent = await this.organizationUserDaoInstance.findLink(reqData.email, reqData.org_name);

            if(!linkPresent)
            {
                return [400, {code: 400, data:{error: "No such user in this organization", response:""}}];
            }
            const createRequest = await this.wfhRequestDaoInstance.createWfhRequest(reqData);
            return [200, {code: 200, data:{error: "", response:createRequest}}];
        }
        catch(error: any){
            return [401, {code: 401, data:{error: error.message, response: ""}}];
        }
    }
}

export default organizationUserServices;