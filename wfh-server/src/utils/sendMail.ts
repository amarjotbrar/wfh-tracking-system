import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { send } from 'process';

dotenv.config();

const transporter  = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendMail = async (email: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your otp for login",
        text: `OTP: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error", error);
            return ({ error: "email not sent" });
        } else {
            console.log("Email sent");
            return ({ message: "Email sent successfully" });
        }
    });
}

export default sendMail;