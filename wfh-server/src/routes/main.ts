import {Router} from 'express';

import { systemUserValidator } from '../validators/systemUserRegister.validator.js';
import organizationUserController from "../controllers/organizationUser.controller.js";
import systemUserController from "../controllers/systemUser.controller.js";
import organizationController from "../controllers/organization.controller.js";
import { zodValidator } from '../validators/zod.validator.js';
import { organizationUserValidator } from '../validators/organizationUserRegister.validator.js';
import { createOrganizationValidator } from '../validators/createOrganization.validator.js';

class routes{
    public organizationUserPath = '/org';
    public systemUserPath = '/sys';
    public router = Router();
    public organizationUserController = new organizationUserController();
    public systemUserController = new systemUserController();
    public organizationController = new organizationController();

    constructor() {
        this.initializeSystemUserRoutes(`${this.systemUserPath}`);
        this.initializeOrganizationUserRoutes(`${this.organizationUserPath}`);
    }

    private initializeSystemUserRoutes(prefix: string){
        console.log("System User routes initialized...");
        this.router.post(`${prefix}/register`, zodValidator(systemUserValidator), this.systemUserController.createSystemUser);
        this.router.post(`${prefix}/createorg`, zodValidator(createOrganizationValidator), this.organizationController.createOrganization);
        this.router.get(`${prefix}/showorgs`, this.organizationController.showOrganizations);
        this.router.delete(`${prefix}/deleteorg/:id`, this.organizationController.deleteOrganization);
        this.router.post(`${prefix}/sendotp`, this.systemUserController.sendOtp);
        this.router.post(`${prefix}/login`, this.systemUserController.login);
    }

    private initializeOrganizationUserRoutes(prefix: string){
        console.log("Organization User routes initialized...")
        this.router.post(`${prefix}/register`, zodValidator(organizationUserValidator),this.organizationUserController.createOrganizationUser);
    }
}

export default routes;