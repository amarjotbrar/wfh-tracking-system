import { Request,Response } from "express";
import otpServices from "../services/otpServices.js";
import systemUserServices from "../services/systemUserServices.js";

class systemUserController{
    private systemUserServiceInstance = new systemUserServices();
    private otpServiceInstance = new otpServices();

    public createSystemUser = async (req:Request,res:Response):Promise<any> => {
        const usrData = req.body;
        const [status, response] = await this.systemUserServiceInstance.createSystemUser(usrData);
        res.status(status).json(response);
    }

    public sendOtp = async (req: Request, res: Response): Promise<any> =>{
        const{email} = req.body;

        const [status,response] = await this.otpServiceInstance.sendSystemOtp(email);
        res.status(status).json(response);
    }

    public login = async (req: Request, res: Response): Promise<any> =>{
        const userData = req.body;
        const [status, response] = await this.systemUserServiceInstance.verifyLogin(userData);
        res.status(status).json(response);
    }
}

export default systemUserController;