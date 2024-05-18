import { Request,Response } from "express";
import organizationServices from "../services/organizationServices.js";
import jwt from "jsonwebtoken";

class organizationController{
    private organizationServiceInstance = new organizationServices();

    public createOrganization = async (req:Request,res:Response):Promise<any> => {
        const organizationData = req.body;
        const [status, response] = await this.organizationServiceInstance.createOrganization(organizationData);
        res.status(status).json(response);
    }

    public showOrganizations = async(req:Request,res:Response):Promise<any> => {
       
        const [status, response] = await this.organizationServiceInstance.getOrganizations();
        res.status(status).json(response);
    }

    public deleteOrganization = async(req: Request, res: Response): Promise<any> => {
        const {id} = req.params;
        const [status, response] = await this.organizationServiceInstance.deleteOrganization(id);
        res.status(status).json(response);
    }
}

export default organizationController;