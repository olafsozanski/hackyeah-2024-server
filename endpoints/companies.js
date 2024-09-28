const express = require('express');
const { Company } = require('../models/company');
const companiesRouter = express.Router();

companiesRouter.get('/', async (req, res) => {
    const company = await Company.find({});
    res.json(company)
});

companiesRouter.post('/', async (req, res) => {
    const { nip, name, address } = req.body;

    const company = await Company.create({
        nip, name, address
    });

    res.json(company)
});

module.exports = { companiesRouter };