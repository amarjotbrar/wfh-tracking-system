import organizationUserDao from "../dao/organizatioinUserDao.js";
import organizationDao from "../dao/organization.dao.js";
import otpDao from "../dao/otp.dao.js";
import wfhRequestDao from "../dao/wfhRequestDao.js";
import jwt from "jsonwebtoken";
import { dateConvertor, yearFirstConvertor } from "../helpers/dateHelpers.js";

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
        if(!orgPresent.isActive) return [401, {code: 401, data:{error:"This Organization is InActive!"}}]

        const userAlreadyPresent = await this.organizationUserDaoInstance.findLink(linkCreation.email, linkCreation.org_name);
        if(userAlreadyPresent) return[401, {code:401, data:{error: "User already present!"}}];

        try{
            const dob = yearFirstConvertor(userData.dob.toString());
            const doj = yearFirstConvertor(userData.doj.toString());
            const day = new Date();
            const today = dateConvertor(day);

            if(dob > today || doj > today)
            {
                return [400, {code: 400, data:{error: "Invalid Dates!"}}];
            }
            if(doj < dob)
            {
                return [400, {code: 400, data:{error: "Can't join before birth!"}}];
            }

            if(today - dob < (365*16))
            {
                return [400, {code: 400, data:{error: "Age should be atleast 16!"}}];
            }
            
            const userAdded = await this.organizationUserDaoInstance.createOrganizationUser(userData);
            return [200, {code: 200, data:{response:userAdded}}];
        } catch (error:any){
            console.log(error);
            return [401, {code: 401, data:{error: error.message}}];
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
                return[400, {code: 400, data:{error: "User not present, Please register First"}}];
            }
            else if(!organizationPresent)
            {
                return[400, {code: 400, data:{error: "Organization not present!"}}];
            }
            else if(!organizationPresent.isActive)
            {
                return[400, {code: 400, data:{error: "Organization is Inactive!"}}];
            }
            else if(!linkPresent)
            {
                return[400, {code: 400, data:{error: "No such user in this organization!"}}];
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
                            id: linkPresent._id,
                            firstName: linkPresent.firstName,
                            email: linkPresent.email,
                            userType: userType,
                            org_name: linkPresent.org_name,
                            maxWfhDays: organizationPresent.maxWfhDays
                        },
                        `${process.env.JWTKEY}`,
                        {
                            expiresIn: "3h"
                        }
                    )

                    return [200, {code: 200, data:{response:{token: token, userType: userType}}}];
                }
                else
                {
                    return [401, {code: 401, data:{error: "Invalid OTP"}}];
                }
            }
        } catch (error) {
            return [400, {code:401, data:{error: "No otp for this User!"}}];
        }
    }


    public createRequest = async(reqData: wfhRequestData, userData: orgUserTokenData): Promise<[number, any]> => {
        try{
            const linkPresent = await this.organizationUserDaoInstance.findLink(userData.email, userData.org_name);

            if(!linkPresent)
            {
                return [400, {code: 400, data:{error: "No such user in this organization"}}];
            }
            const month = reqData.requestDate.substring(3);

            const leavesApplied = await this.wfhRequestDaoInstance.showUserRequests(userData.org_name, userData.email);

            const result = leavesApplied.filter((request) => {
                return (request.requestDate.substring(3) === month &&( request.isApproved == "Pending" || request.isApproved == "Approved"));
            })

            if(result.length >= userData.maxWfhDays)
            {
                return [400, {code: 400, data:{error: "WFH Limit reached for this month!"}}];
            }
            
            const createWfhRequest: createWfhRequest = {
                email: userData.email,
                org_name: userData.org_name,
                requestDate: reqData.requestDate,
                details: reqData.details,
                firstName: userData.firstName
            }

            const createRequest = await this.wfhRequestDaoInstance.createWfhRequest(createWfhRequest);
            return [200, {code: 200, data:{response:createRequest}}];
        }
        catch(error: any){
            return [401, {code: 401, data:{error: error.message}}];
        }
    }

    public showUserRequests = async(email: String, org_name: String, month:string, maxWfhDays: number):Promise<[number, any]> => {
        try {
            const response = await this.wfhRequestDaoInstance.showUserRequests(org_name, email);
            const result = response.filter((request) => {
                return request.requestDate.substring(3) === month;
            })
            return [200, {code: 200, data:{response: result}}];
        } catch (error:any) {
            return [401, {code: 401, data:{error: error.message}}];
        }
    }
}

export default organizationUserServices;