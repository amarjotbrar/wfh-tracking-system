import express from 'express';
const sysHomeRoute = express.Router();
import { sysUser } from '../models/sysUser.model.mjs';

sysHomeRoute.post('/register/org', async(req, res) =>{
    
})

export {sysHomeRoute};