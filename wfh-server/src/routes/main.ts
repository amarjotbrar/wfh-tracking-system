import {Router} from 'express';
import SystemUserRouter from "./SystemUserRoutes.js";
import OrganizationUserRouter from './OrganizationUserRoutes.js';

const router = Router();
router.use("/sys", SystemUserRouter);
router.use("/org", OrganizationUserRouter);

export default router;
