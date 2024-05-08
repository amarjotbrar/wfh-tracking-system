import {Router} from 'express';
import SystemUserRouter from "./SystemUserRoutes.js";

const router = Router();
router.use("/sys", SystemUserRouter)

export default router;
