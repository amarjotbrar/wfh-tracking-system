import organizationDao from "../dao/organization.dao.js";
import wfhRequestDao from "../dao/wfhRequestDao.js";

class organizationAdminServices {
    private organizationDaoInstance = new organizationDao();
    private whfRequestDaoInstance = new wfhRequestDao();

    public showRequests = async (org_name: string, skip: number, limit: number, requestStatus: string): Promise<[number,any]> =>{
        try{
            const showRequests = await this.whfRequestDaoInstance.showRequests(org_name, skip, limit, requestStatus);
            const totalRequests = await this.whfRequestDaoInstance.getNumberOfRequests(org_name, requestStatus)
            return [200, {code: 200, data:{response:showRequests, totalRequests: totalRequests}}];
        }
        catch(error: any){
            return [401, {code: 401, data:{error: error.message}}];
        }
    }

    public approveRequest = async (id: string): Promise<[number,any]> =>{
        try{
            const approveRequest = await this.whfRequestDaoInstance.approveRequest(id);
            return [200, {code: 200, data:{response:approveRequest}}];
        }
        catch(error: any){
            return [401, {code: 401, data:{error: error.message}}];
        }
    }

    public rejectRequest = async (id: string, reason: string): Promise<[number,any]> =>{
        try{
            const rejectRequest = await this.whfRequestDaoInstance.rejectRequest(id, reason);
            return [200, {code: 200, data:{response:rejectRequest}}];
        }
        catch(error: any){
            return [401, {code: 401, data:{error: error.message}}];
        }
    }

    
}

export default organizationAdminServices;