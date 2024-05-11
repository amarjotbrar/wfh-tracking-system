import { systemUserModel } from "../models/systemUser.model.js";
import generateOtp from "../utils/otpGenerator.js";
import { otpModel } from "../models/otp.model.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

class systemUserDao {
    public createSystemUser = async (userData : systemUser): Promise<[number, any]> => {

        const isEmailAlreadyPresent = async (email: String): Promise<boolean> => {
            const userPresent = await systemUserModel.findOne({email});
            return !!userPresent;
        }

        if(await isEmailAlreadyPresent(userData.email)) return[401, {error: "User already present."}];

        try{
            const userAdded = await systemUserModel.create(userData);
            return [200, userAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }

    public sendOtp = async (email: string): Promise<[number, any]> => {
        if (!email) {
            return [400, { error: "Please Enter Your Email" }];
        }
    
        try {
            const preuser = await systemUserModel.findOne({ email: email });
            if (!preuser) {
                return [400, { error: "This user does not exist" }];
            }
    
            const otp = generateOtp();
    
            let existEmail = await otpModel.findOne({ email: email });
    
            if (existEmail) {
                existEmail.otp = otp;
                await existEmail.save();
            } else {
                existEmail = await otpModel.create({ email: email, otp: otp });
            }
    
            await new Promise((resolve, reject) => {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Your otp for login",
                    text: `OTP: ${otp}`
                };
    
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        reject({ error: "email not sent" });
                    } else {
                        console.log("Email sent");
                        resolve({ message: "Email sent successfully" });
                    }
                });
            });
    
            return [200, { message: "Email sent successfully" }];
        } catch (error) {
            console.error(error);
            return [400, { error: "Invalid Details" }];
        }
    };
    
}

export default systemUserDao;