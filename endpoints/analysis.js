const { analyzeReviews } = require('../ai');
const { Invoice } = require('../models/invoice');

const express = require('express');
const { Company } = require('../models/company');
const { Review } = require('../models/review');

const analysisRouter = express.Router();

analysisRouter.post('/companies/by-nip/:nip/analyze', async (req, res) => {
    const { nip } = req.params;
    const company = await Company.findOne({ nip });
    const reviews = await Review.find({ companyId: company.id });

    const contents = reviews.map(review => review.content);

    return analyzeReviews(contents);
});

analysisRouter.get('/companies/by-nip/invoices/:nip', async (req, res) => {
    const { nip } = req.params;
    const company = await Company.findOne({ nip });
    const paidInvoices = await Invoice.find({ toCompanyId: company.id, paid: true})
    const unpaidInvoices = await Invoice.find({ toCompanyId: company.id, paid: false})

    const totalInvoices = paidInvoices.length + unpaidInvoices.length;
    const percentagePaid = (paidInvoices.length / totalInvoices) * 100;

    res.json(percentagePaid)
});

module.exports = { analysisRouter };