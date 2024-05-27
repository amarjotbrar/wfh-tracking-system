import { otpModel } from "../models/otp.model.js";

class otpDao{
    public findUserOtp = async (email: String) => {
        const response = await otpModel.findOne({email: email});
        return response;
    }

    public updateIsUsed = async(email: String) => {
        const response = await otpModel.findOneAndUpdate({email : email}, {isUsed: true}, {new: true});
        return response;
    }

    public createOtp = async (email: String, otp: String) => {
        const response = await otpModel.create({email, otp});
        return response;
    }

    public updateOtp = async(email: string, otp: string) =>{
        let existEmail = await this.findUserOtp(email);
        if (existEmail) {
            existEmail.otp = otp;
            existEmail.isUsed = false;
            await existEmail.save();
        }
    }
}

export default otpDao;