import express from 'express';
const regOrgRoute = express.Router();
import { orgUser } from '../models/orgUser.model.mjs';

regOrgRoute.post('/register/org', async(req, res) =>{
    const{firstName, lastName, org, email, dob, doj, isVerified} = req.body;
    try {
        const userAdded = await orgUser.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            org: org,
            dob: dob,
            doj: doj,
            isVerified: isVerified
        });
        res.status(201).json(userAdded);
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }
})

export {regOrgRoute};