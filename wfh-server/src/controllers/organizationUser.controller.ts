import { Request,Response } from "express";
import organizationUserServices from "../services/organizationUserServices.js";
import otpServices from "../services/otpServices.js";
import wfhRequestDao from "../dao/wfhRequestDao.js";

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

    public creteRequest = async (req: Request, res: Response): Promise<any> =>{
        const reqData: wfhRequestData = req.body;
        const userData = {
            email: req.user.email,
            org_name: req.user.org_name,
            firstName: req.user.firstName,
            maxWfhDays: req.user.maxWfhDays
        }
        const [status, response] = await this.organizationUserServiceInstance.createRequest(reqData, userData);
        res.status(status).json(response);
    }

    public showUserRequests = async(req: Request, res: Response): Promise<any> => {
        const org_name = req.user.org_name;
        const email = req.user.email;
        const month = req.params.month;
        const maxWfhDays = req.user.maxWfhDays;
        const [status, response] = await this.organizationUserServiceInstance.showUserRequests(email, org_name, month, maxWfhDays);
        res.status(status).json(response);
    }
}

export default organizationUserController;