import { Request,Response } from "express";
import organizationAdminServices from "../services/organizationAdminServices.js";

class organizationAdminController{
    private organizationAdminServiceInstance = new organizationAdminServices();

    public approveRequest = async (req: Request, res: Response): Promise<any> =>{
        const id: string = req.params.id;
        const [status, response] = await this.organizationAdminServiceInstance.approveRequest(id);
        res.status(status).json(response);
    }

    public rejectRequest = async (req: Request, res: Response): Promise<any> =>{
        const id: string = req.params.id;
        const {reason} = req.body;
        const [status, response] = await this.organizationAdminServiceInstance.rejectRequest(id, reason);
        res.status(status).json(response);
    }

    public showRequests = async (req: Request, res: Response): Promise<any> =>{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const requestStatus = `${req.query.status}` || "Pending";
        const org_name: string = req.params.org_name;
        const [status, response] = await this.organizationAdminServiceInstance.showRequests(org_name, skip, limit, requestStatus);
        res.status(status).json(response);
    }
}

export default organizationAdminController;