import { organizationModel } from "../models/organization.model.js";

class organizationDao {
    public createOrganization = async (orgData : orgType): Promise<[number, any]> => {
        
        const isOrganizationAlreadyPresent = async (org_name: String): Promise<boolean> => {
            const orgPresent = await organizationModel.findOne({org_name});
            return !!orgPresent;
        }

        if(await isOrganizationAlreadyPresent(orgData.org_name)) return[401, {error: "Organization already present."}]

        try{
            const orgAdded = await organizationModel.create(orgData);
            return [200, orgAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }

    public getOrganizations = async (): Promise<[number,any]> =>{
        try{
            const allOrgs = await organizationModel.find();
            return [200, allOrgs];
        }
        catch(error: any){
            return [401, {error: error.message}];
        }
    }

    public deleteOrganization = async (id: any): Promise<[number, any]> => {
        try{
            const orgDeleted = await organizationModel.findByIdAndDelete({_id: id});
            return [200, orgDeleted];
        } catch (error: any) {
            return [500, {error: error.message}];
        }
    }
}

export default organizationDao;