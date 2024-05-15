import systemUserDao from "../dao/systemUser.dao.js";
import otpDao from "../dao/otp.dao.js";
import jwt from "jsonwebtoken";

class systemUserServices {
    private systemUserDaoInstance = new systemUserDao();
    private otpDaoInstance = new otpDao();

    public createSystemUser = async(userData: systemUser) : Promise<[number, any]> => {
        const userAlreadyPresent = await this.systemUserDaoInstance.findSystemUser(userData.email);

        if(!!userAlreadyPresent) return[400, {error: "User already present"}];

        try {
            const userAdded = await this.systemUserDaoInstance.createSystemUser(userData);
            return[200, userAdded];
        } catch (error: any) {
            return [400, {error: error.message }];
        }
    }

    public verifyLogin = async(userLoginData : systemUserLogin): Promise<[number, any]> => {
        const {email, otp} = userLoginData;

        try {
            const userPresent = await this.systemUserDaoInstance.findSystemUser(email);

            if(!userPresent)
            {
                return[400, {error: "User not present, Please register First"}];
            }
            else
            {
                console.log("user present");
                const verifyLogin:any = await this.otpDaoInstance.findUserOtp(email);

                if(verifyLogin.otp == otp)
                {
                    const token = jwt.sign(
                        {
                            id: verifyLogin._id,
                            email: verifyLogin.email
                        },
                        `${process.env.JWTKEY}`,
                        {
                            expiresIn: "1h"
                        }
                    )

                    return [200, {token}];
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

export default systemUserServices;