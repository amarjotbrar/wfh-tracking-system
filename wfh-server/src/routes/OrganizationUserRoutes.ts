import express from "express";
const OrganizationUserRouter = express.Router();
import OrganizationUserController from "../controllers/OrganizationUserController.js";

const OrganizationUserControllerInstance = new OrganizationUserController();

OrganizationUserRouter.post('/register', OrganizationUserControllerInstance.CreateOrganizationUser);

export default OrganizationUserRouter;