import { Request,Response } from "express";
import OrganizationUserDao from "../dao/OrganizationUser.dao.js";

class OrganizationUserController{
    private OrganizationUserDaoInstance = new OrganizationUserDao();

    public CreateOrganizationUser = async (req:Request,res:Response):Promise<any> => {
        const usrData = req.body;
        const [status, response] = await this.OrganizationUserDaoInstance.CreateOrganizationUser(usrData);
        res.status(status).json(response);
    }
}

export default OrganizationUserController;