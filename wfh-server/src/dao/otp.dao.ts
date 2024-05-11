import { otpModel } from "../models/otp.model.js";
import { systemUserModel } from "../models/systemUser.model.js";

class otpDao {
    public verifyLogin = async (userLoginData : systemUserLogin): Promise<[number, any]> => {
        const {email,otp} = userLoginData;

        if(!otp || !email){
            return[200, {error: "Please enter your otp and emial"}];
        }

        try{
            const otpVerification:any = await otpModel.findOne({email:email});
            
            if(otpVerification.otp === otp){
                const preuser = await systemUserModel.findOne({email:email});
                return[200, {message: "Verified Successfully"}];
            }
            else{
                return[400, {error: "Invalid otp"}]
            }
        }
        catch(error){
            return[400, {error: "Invalid Details"}]
        }
    }
}

export default otpDao;