import { Request,Response } from "express";
import systemUserDao from "../dao/systemUser.dao.js";
import otpDao from "../dao/otp.dao.js";

class systemUserController{
    private systemUserDaoInstance = new systemUserDao();
    private otpDaoInstance = new otpDao();

    public createSystemUser = async (req:Request,res:Response):Promise<any> => {
        const usrData = req.body;
        const [status, response] = await this.systemUserDaoInstance.createSystemUser(usrData);
        res.status(status).json(response);
    }

    public sendOtp = async (req: Request, res: Response): Promise<any> =>{
        const{email} = req.body;

        const [status,response] = await this.systemUserDaoInstance.sendOtp(email);
        res.status(status).json(response);
    }

    public login = async (req: Request, res: Response): Promise<any> =>{
        const userData = req.body;
        const [status, response] = await this.otpDaoInstance.verifyLogin(userData);
        res.status(status).json(response);
    }
}

export default systemUserController;