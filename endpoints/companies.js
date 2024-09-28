const express = require('express');
const { Company } = require('../models/company');
const companiesRouter = express.Router();

companiesRouter.get('/', async (req, res) => {
    // TODO
});

companiesRouter.post('/', async (req, res) => {
    // TODO
});

module.exports = { companiesRouter };