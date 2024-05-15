import { otpModel } from "../models/otp.model.js";

class otpDao{
    public findUserOtp = async (email: String) => {
        console.log("user find run")
        const response = await otpModel.findOne({email: email});
        return response;
    }
    public createOtp = async (email: String, otp: String) => {
        console.log("otpcreate turn")
        const response = await otpModel.create({email, otp});
        return response;
    }

    public updateOtp = async(email: string, otp: string) =>{
        let existEmail = await this.findUserOtp(email);
        if (existEmail) {
            existEmail.otp = otp;
            await existEmail.save();
        }
    }
}

export default otpDao;