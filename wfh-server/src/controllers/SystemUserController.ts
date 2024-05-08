import { Request,Response } from "express";
import SystemUserDao from "../dao/SystemUser.dao.js";

class SystemUserController{
    private SystemUserDaoInstance = new SystemUserDao();

    public CreateSystemUser = async (req:Request,res:Response):Promise<any> => {
        const usrData = req.body;
        const [status, response] = await this.SystemUserDaoInstance.CreateSystemUser(usrData);
        res.status(status).json(response);
    }
}

export default SystemUserController;