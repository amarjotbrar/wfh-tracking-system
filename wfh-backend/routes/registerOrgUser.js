const express = require('express');
const mongoose = require("mongoose");
const orgUser = require('../models/orgUser')

const router = express.Router()

//create user

router.post("/register", async (req,res)=>{
    const{firstName, lastName, org, email, DOB, DOJ} = req.body;
    try {
        const userAdded = await orgUser.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            organization: org,
            dob: DOB,
            doj: DOJ,
        });
        res.status(201).json(userAdded);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
});

module.exports = router;