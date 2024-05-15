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
        const token = req.headers.authorization;
        
        console.log(token);

        if(token){ 
            jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
                console.log(err);
                console.log(decoded);
            });
        }

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