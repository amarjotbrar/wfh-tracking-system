import {Router} from 'express';

import { systemUserValidator } from '../middleware/validators/systemUser.validator.js';
import organizationUserController from "../controllers/organizationUser.controller.js";
import systemUserController from "../controllers/systemUser.controller.js";
import organizationController from "../controllers/organization.controller.js";
import organizationAdminController from '../controllers/organizationAdmin.controller.js';
import zodValidator from '../middleware/validators/zod.validator.js';
import { organizationUserValidator } from '../middleware/validators/organizationUser.validator.js';
import { createOrganizationValidator } from '../middleware/validators/systemUser.validator.js';
import { adminAuthorization, orgAuthorization, sysAuthorization} from '../middleware/authMiddleware.js';

class routes{
    public organizationUserPath = '/org';
    public systemUserPath = '/sys';
    public adminPath = '/admin'
    public router = Router();
    public organizationUserController = new organizationUserController();
    public systemUserController = new systemUserController();
    public organizationController = new organizationController();
    private organizationAdminControlloer = new organizationAdminController();
    private zodValidator = new zodValidator();

    constructor() {
        this.initializeSystemUserRoutes(`${this.systemUserPath}`);
        this.initializeOrganizationUserRoutes(`${this.organizationUserPath}`);
        this.initializeAdminRoutes(`${this.adminPath}`);
    }

    private initializeSystemUserRoutes(prefix: string){
        console.log("System User routes initialized...");
        this.router.post(`${prefix}/register`, this.zodValidator.zodValidator(systemUserValidator), this.systemUserController.createSystemUser);
        this.router.post(`${prefix}/createorg`,sysAuthorization, this.zodValidator.zodValidator(createOrganizationValidator), this.organizationController.createOrganization);
        this.router.get(`${prefix}/showorgs`,sysAuthorization, this.organizationController.showOrganizations);
        this.router.delete(`${prefix}/deleteorg/:id`,sysAuthorization, this.organizationController.deleteOrganization);
        this.router.post(`${prefix}/sendotp`,this.systemUserController.sendOtp);
        this.router.post(`${prefix}/login`, this.systemUserController.login);
        this.router.get(`${prefix}/showusers/:org_name`,sysAuthorization, this.systemUserController.findUsers);
        this.router.put(`${prefix}/makeadmin/:id`,sysAuthorization, this.systemUserController.makeAdmin);
    }

    private initializeOrganizationUserRoutes(prefix: string){
        console.log("Organization User routes initialized...")
        this.router.post(`${prefix}/register`, this.zodValidator.zodValidator(organizationUserValidator),this.organizationUserController.createOrganizationUser);
        this.router.post(`${prefix}/sendotp`, this.organizationUserController.sendOtp);
        this.router.post(`${prefix}/login`, this.organizationUserController.login);
        this.router.post(`${prefix}/createrequest`,orgAuthorization, this.organizationUserController.creteRequest);
        this.router.get(`${prefix}/showrequests`, orgAuthorization, this.organizationUserController.showUserRequests);
    }

    private initializeAdminRoutes(prefix: string){
        console.log("Admin routes initialized...")
        this.router.get(`${prefix}/showrequests/:org_name`, adminAuthorization, this.organizationAdminControlloer.showRequests);
        this.router.patch(`${prefix}/approvereq/:id`,adminAuthorization, this.organizationAdminControlloer.approveRequest);
        this.router.patch(`${prefix}/rejectreq/:id`, adminAuthorization,this.organizationAdminControlloer.rejectRequest);
    }
}

export default routes;