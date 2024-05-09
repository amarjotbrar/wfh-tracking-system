import express from "express";
const SystemUserRouter = express.Router();
import SystemUserController from "../controllers/SystemUserController.js";
import OrganizationController from "../controllers/OrganizationController.js";

const SystemUserControllerInstance = new SystemUserController();
const OrganizationControllerInstance = new OrganizationController();

SystemUserRouter.post('/register', SystemUserControllerInstance.CreateSystemUser);
SystemUserRouter.post('/createorg', OrganizationControllerInstance.CreateOrganization);
SystemUserRouter.get('/showorgs', OrganizationControllerInstance.ShowOrganizations);
SystemUserRouter.delete("/deleteorg/:id", OrganizationControllerInstance.DeleteOrganization);

export default SystemUserRouter;