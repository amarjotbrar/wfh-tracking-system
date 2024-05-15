import organizationDao from "../dao/organization.dao.js";

class organizationServices {
    private organizationDaoInstance = new organizationDao();

    public createOrganization = async (orgData : orgType): Promise<[number, any]> => {
        
        const organizationAlreadyPresent = await this.organizationDaoInstance.findOrganization(orgData.org_name);

        if(!!organizationAlreadyPresent) return[401, {error: "Organization already present."}]

        try{
            const orgAdded = await this.organizationDaoInstance.createOrganization(orgData);
            return [200, orgAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }

    public getOrganizations = async (): Promise<[number,any]> =>{
        try{
            const allOrgs = await this.organizationDaoInstance.showAllOrganizations();
            return [200, allOrgs];
        }
        catch(error: any){
            return [401, {error: error.message}];
        }
    }

    public deleteOrganization = async (id: String): Promise<[number, any]> => {
        try{
            const orgDeleted = await this.organizationDaoInstance.deleteOrganization(id);
            return [200, orgDeleted];
        } catch (error: any) {
            return [500, {error: error.message}];
        }
    }
}

export default organizationServices;