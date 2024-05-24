import organizationDao from "../dao/organization.dao.js";

class organizationServices {
    private organizationDaoInstance = new organizationDao();

    public createOrganization = async (orgData : orgType): Promise<[number, any]> => {
        
        const organizationAlreadyPresent = await this.organizationDaoInstance.findOrganization(orgData.org_name);

        if(!!organizationAlreadyPresent)
        {
            if(organizationAlreadyPresent.isActive) return[401, {code: 401, data:{error: "Organization already present."}}];

            else
            {
                try {
                    const response = await this.organizationDaoInstance.makeOrganizationLive({id: `${organizationAlreadyPresent._id}`, name: orgData.name, maxWfhDays: orgData.maxWfhDays});
                    return [200, {code: 200, data:{response: response, message: `${orgData.org_name} is live again!`}}];
                } catch (error) {
                    return [400, {code: 200, data:{error:error}}];
                }
            }
        }

        try{
            const orgAdded = await this.organizationDaoInstance.createOrganization(orgData);
            return [200, {code: 200, data:{response:orgAdded, message: `${orgData.org_name} created successfully!`}}];
        } catch (error:any){
            return [401, {code: 401, data:{error: error.message}}];
        }
    }

    public getOrganizations = async (): Promise<[number,any]> =>{
        try{
            const allOrgs = await this.organizationDaoInstance.showAllOrganizations();
            return [200, {code: 200, data:{response:allOrgs}}];
        }
        catch(error: any){
            return [401, {code: 401, data:{error: error.message}}];
        }
    }

    public deleteOrganization = async (id: String): Promise<[number, any]> => {
        try{
            const orgDeleted = await this.organizationDaoInstance.deliveOrganization(id);
            return [200, {code: 200, data:{response:orgDeleted}}];
        } catch (error: any) {
            return [500, {code: 500, data:{error: error.message}}];
        }
    }
}

export default organizationServices;