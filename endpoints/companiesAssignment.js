const express = require('express');
const { Company, CompanyAssignment} = require('../models/companyAssignment');
const companiesAssignmentRouter = express.Router();

companiesAssignmentRouter.get('/', async (req, res) => {
    const companiesAssignment = await CompanyAssignment.find({});
    res.json(companiesAssignment)
});

companiesAssignmentRouter.post('/', async (req, res) => {
    const { company1Id, company2Id, lastInteractionDate } = req.body;

    const companiesAssignment = await CompanyAssignment.create({
        company1Id, company2Id, lastInteractionDate
    });

    res.json(companiesAssignment)
});

module.exports = { companiesAssignmentRouter };