const express = require('express');
const { Invoice } = require('../models/invoice');
const invoicesRouter = express.Router();

invoicesRouter.get('/', async (req, res) => {
    const invoice = await Invoice.find({});
    res.json(invoice)
});

invoicesRouter.post('/', async (req, res) => {
    const { fromCompanyId, toCompanyId, item, amount, issueDate, paymentDate, paid } = req.body;

    const invoice = await Invoice.create({
        fromCompanyId, toCompanyId, item, amount, issueDate, paymentDate, paid
    });

    res.json(invoice)
});

module.exports = { invoicesRouter };