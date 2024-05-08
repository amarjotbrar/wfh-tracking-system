import { OrganizationModel } from "../models/Organization.model.mjs";

class OrganizationDao {
    public CreateOrganization = async (orgData : orgType): Promise<[number, any]> => {
        try{
            const orgAdded = await OrganizationModel.create(orgData);
            return [200, orgAdded];
        } catch (error:any){
            return [401, {error: error.message}];
        }
    }

    public GetOrganizations = async (): Promise<[number,any]> =>{
        try{
            const allOrgs = await OrganizationModel.find();
            return [200, allOrgs];
        }
        catch(error: any){
            return [401, {error: error.message}];
        }
    }

    public DeleteOrganization = async (id: any): Promise<[number, any]> => {
        try{
            const orgDeleted = await OrganizationModel.findByIdAndDelete({_id: id});
            return [200, orgDeleted];
        } catch (error: any) {
            return [500, {error: error.message}];
        }
    }
}

export default OrganizationDao;