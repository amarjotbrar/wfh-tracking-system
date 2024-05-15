import { Request,Response } from "express";
import organizationUserServices from "../services/organizationUserServices.js";
import otpServices from "../services/otpServices.js";

class organizationUserController{
    private organizationUserServiceInstance = new organizationUserServices();
    private otpServiceInstance = new otpServices();

    public createOrganizationUser = async (req:Request,res:Response):Promise<any> => {
        const usrData = req.body;
        const [status, response] = await this.organizationUserServiceInstance.createOrganizationUser(usrData);
        res.status(status).json(response);
    }

    public sendOtp = async (req: Request, res: Response): Promise<any> =>{
        const{email, org_name} = req.body;

        const [status,response] = await this.otpServiceInstance.sendOrganizationOtp(email, org_name);
        res.status(status).json(response);
    }

    public login = async (req: Request, res: Response): Promise<any> =>{
        const userData = req.body;
        const [status, response] = await this.organizationUserServiceInstance.verifyLogin(userData);
        res.status(status).json(response);
    }
}

export default organizationUserController;