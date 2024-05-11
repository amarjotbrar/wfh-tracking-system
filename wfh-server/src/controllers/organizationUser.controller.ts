import { Request,Response } from "express";
import organizationUserDao from "../dao/organizationUser.dao.js";

class organizationUserController{
    private organizationUserDaoInstance = new organizationUserDao();

    public createOrganizationUser = async (req:Request,res:Response):Promise<any> => {
        const usrData = req.body;
        const [status, response] = await this.organizationUserDaoInstance.createOrganizationUser(usrData);
        res.status(status).json(response);
    }
}

export default organizationUserController;