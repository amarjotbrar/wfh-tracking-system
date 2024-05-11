import { Request,Response } from "express";
import organizationDao from "../dao/organization.dao.js";

class organizationController{
    private organizationDaoInstance = new organizationDao();

    public createOrganization = async (req:Request,res:Response):Promise<any> => {
        const organizationData = req.body;
        const [status, response] = await this.organizationDaoInstance.createOrganization(organizationData);
        res.status(status).json(response);
    }

    public showOrganizations = async(req:Request,res:Response):Promise<any> => {
        const [status, response] = await this.organizationDaoInstance.getOrganizations();
        res.status(status).json(response);
    }

    public deleteOrganization = async(req: Request, res: Response): Promise<any> => {
        const {id} = req.params;
        const [status, response] = await this.organizationDaoInstance.deleteOrganization(id);
        res.status(status).json(response);
    }
}

export default organizationController;