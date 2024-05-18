import organizationDao from "../dao/organization.dao.js";

class organizationServices {
    private organizationDaoInstance = new organizationDao();

    public createOrganization = async (orgData : orgType): Promise<[number, any]> => {
        
        const organizationAlreadyPresent = await this.organizationDaoInstance.findOrganization(orgData.org_name);

        if(!!organizationAlreadyPresent)
        {
            if(organizationAlreadyPresent.isActive) return[401, {code: 401, data:{error: "Organization already present.", response: ""}}];

            else
            {
                try {
                    const response = await this.organizationDaoInstance.makeOrganizationLive(`${organizationAlreadyPresent._id}`);
                    return [200, {code: 200, data:{error: "", response: response}}];
                } catch (error) {
                    return [400, {code: 200, data:{error:error, response:""}}];
                }
            }
        }

        try{
            const orgAdded = await this.organizationDaoInstance.createOrganization(orgData);
            return [200, {code: 200, data:{error:"", response:orgAdded}}];
        } catch (error:any){
            return [401, {code: 401, data:{error: error.message, response: ""}}];
        }
    }

    public getOrganizations = async (): Promise<[number,any]> =>{
        try{
            const allOrgs = await this.organizationDaoInstance.showAllOrganizations();
            return [200, {code: 200, data:{error: "", response:allOrgs}}];
        }
        catch(error: any){
            return [401, {code: 401, data:{error: error.message, response: ""}}];
        }
    }

    public deleteOrganization = async (id: String): Promise<[number, any]> => {
        try{
            const orgDeleted = await this.organizationDaoInstance.deliveOrganization(id);
            return [200, {code: 200, data:{error: "", response:orgDeleted}}];
        } catch (error: any) {
            return [500, {code: 500, data:{error: error.message, response: ""}}];
        }
    }
}

export default organizationServices;