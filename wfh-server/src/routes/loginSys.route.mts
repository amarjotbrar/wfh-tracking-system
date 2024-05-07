import express from 'express';
const regOrgRoute = express.Router();
import { orgUser } from '../models/orgUser.model.mjs';
import { otpModel } from '../models/otp.model.mjs';

regOrgRoute.post('/login/org', async(req, res) =>{
    try {
        const {email} = req.body;

        const userData = await orgUser.findOne({email});

        if(!userData){
            return res.status(400).json({
                success: false,
                msg: "Email doesn't exist"
            })
        }

        
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }
})

export {regOrgRoute};