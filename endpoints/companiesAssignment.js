const express = require('express');
const { Company } = require('../models/companyAssignment');
const companiesAssignmentRouter = express.Router();

companiesAssignmentRouter.get('/', async (req, res) => {
    // TODO
});

companiesAssignmentRouter.post('/', async (req, res) => {
    // TODO
});

module.exports = { companiesAssignmentRouter };