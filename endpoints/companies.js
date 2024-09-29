const express = require('express');
const { Company } = require('../models/company');
const {Review} = require("../models/review");
const {analyzeReviews} = require("../ai");
const companiesRouter = express.Router();

companiesRouter.get('/', async (req, res) => {
    const company = await Company.find({});
    res.json(company)
});

companiesRouter.get('/:nip', async (req, res) => {
    const { nip } = req.params;
    const company = await Company.findOne({ nip });

    res.json(company)
});

companiesRouter.post('/', async (req, res) => {
    const { nip, name, startDate, verificationDate, address } = req.body;

    const company = await Company.create({
        nip, name, startDate, verificationDate, address
    });

    res.json(company)
});

module.exports = { companiesRouter };