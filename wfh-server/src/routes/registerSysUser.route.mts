import express from "express";
const regSysRoute = express.Router();

import { sysUser } from "../models/sysUser.model.mjs";

regSysRoute.post('/register/sys', async(req,res) =>{
    const{firstName, lastName, email, dob, isVerified} = req.body;
    try{
        const userAdded = await sysUser.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            dob: dob,
            isVerified: isVerified
        });
        res.status(201).json(userAdded);
    } catch (error:any){
        res.status(400).json({error: error.message});
    }
})

export {regSysRoute};