import { Request,Response } from "express";
import OrganizationDao from "../dao/Organization.dao.js";

class OrganizationController{
    private OrganizationDaoInstance = new OrganizationDao();

    public CreateOrganization = async (req:Request,res:Response):Promise<any> => {
        const OrganizationData = req.body;
        const [status, response] = await this.OrganizationDaoInstance.CreateOrganization(OrganizationData);
        res.status(status).json(response);
    }

    public ShowOrganizations = async(req:Request,res:Response):Promise<any> => {
        const [status, response] = await this.OrganizationDaoInstance.GetOrganizations();
        res.status(status).json(response);
    }

    public DeleteOrganization = async(req: Request, res: Response): Promise<any> => {
        const {id} = req.params;
        const [status, response] = await this.OrganizationDaoInstance.DeleteOrganization(id);
        res.status(status).json(response);
    }
}

export default OrganizationController;