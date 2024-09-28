const express = require('express');
const { Company } = require('../models/companyAssignment');
const companiesAssignmentRouter = express.Router();

companiesAssignmentRouter.get('/', async (req, res) => {
    const companiesAssignment = await Company.find({});
    res.render('companiesAssignment/index', { companiesAssignment });
});

companiesAssignmentRouter.post('/', async (req, res) => {
    const { company1Id, company2Id, lastInteractionDate } = req.body;

    const companiesAssignment = await Company.create({
        company1Id, company2Id, lastInteractionDate
    });

    res.redirect('/companiesAssignment/' + companiesAssignment._id);
});

module.exports = { companiesAssignmentRouter };