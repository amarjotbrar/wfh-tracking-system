import systemUserDao from "../dao/systemUser.dao.js";
import otpDao from "../dao/otp.dao.js";
import organizationUserDao from "../dao/organizatioinUserDao.js";
import jwt from "jsonwebtoken";

class systemUserServices {
    private systemUserDaoInstance = new systemUserDao();
    private otpDaoInstance = new otpDao();
    private organizationUserDaoInstance = new organizationUserDao();

    public createSystemUser = async(userData: systemUser) : Promise<[number, any]> => {
        const userAlreadyPresent = await this.systemUserDaoInstance.findSystemUser(userData.email);

        if(!!userAlreadyPresent) return[400, {code: 400, data:{error: "User already present"}}];

        try {
            const userAdded = await this.systemUserDaoInstance.createSystemUser(userData);
            return[200, {code: 200, data:{response:userAdded}}];
        } catch (error: any) {
            return [400, {code: 200, data:{error: error.message}}];
        }
    }

    public verifyLogin = async(userLoginData : systemUserLogin): Promise<[number, any]> => {
        const {email, otp} = userLoginData;

        try {
            const userPresent = await this.systemUserDaoInstance.findSystemUser(email);

            if(!userPresent)
            {
                return[400, {code: 400, data:{error: "User not present, Please register First"}}];
            }
            else
            {
                const verifyLogin:any = await this.otpDaoInstance.findUserOtp(email);

                const now = new Date();
                const created:Date = verifyLogin.updatedAt;
                const createdTime = (created.getFullYear() * 365 * 24 * 60) + (created.getMonth() * 30 * 24 * 60) + (created.getDate()* 24 * 60) + (created.getHours() * 60) + (created.getMinutes());
                const currTime = (now.getFullYear() * 365 * 24 * 60) + (now.getMonth() * 30 * 24 * 60) + (now.getDate()* 24 * 60) + (now.getHours() * 60) + (now.getMinutes());
                
                if((currTime - createdTime) > 15)
                {
                    return [400, {code: 400, data:{error: "OTP Expired"}}];
                }

                if(verifyLogin.otp == otp)
                {
                    const token = jwt.sign(
                        {
                            id: verifyLogin._id,
                            firstName: verifyLogin.firstName,
                            email: verifyLogin.email,
                            userType: "system"
                        },
                        `${process.env.JWTKEY}`,
                        {
                            expiresIn: "3h"
                        }
                    )

                    return [200, {code: 200, data:{response:token}}];
                }
                else
                {
                    return [400, {code: 400, data:{error: "Invalid OTP"}}];
                }
            }
        } catch (error) {
            return [400,{code: 400, data: {error: "No otp for this User!"}}];
        }
    }

    public getOrganizationUsers = async(org_name: string): Promise<[number,any]> => {
        try {
            const response = await this.organizationUserDaoInstance.findUsers(org_name);
            return [200, {code: 400, data:{response:response}}];
        } catch (error) {
            return [400, {code: 400, data: {error: error}}];
        }
    }

    public makeAdmin = async(id: string): Promise<[number, any]> => {
        try {
            const userData = await this.organizationUserDaoInstance.findOrganizationUserById(id);
            if(!userData)
            {
                return [400, {code: 400, data:{error: "User not found!"}}];
            }

            const value = userData.isAdmin;
            if(!value)
            {
                const adminPresent = await this.organizationUserDaoInstance.findAdmin(userData.org_name);
                if (adminPresent)
                {
                    return [400, {code: 400, data:{error: "Admin already present!"}}];
                }
            }
            const response = await this.organizationUserDaoInstance.makeAdmin(id, value);
            return[200, {code: 200, data:{response:response}}];
        } catch (error) {
            return [400, {code: 400, data:{error: error}}];
        }
    }
}

export default systemUserServices;