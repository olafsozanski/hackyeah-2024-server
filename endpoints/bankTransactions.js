const express = require('express');
const { BankTransaction } = require('../models/bankTransaction');
const transactionsRouter = express.Router();

transactionsRouter.get('/', async (req, res) => {
    const bankTransaction = await BankTransaction.find({});
    res.json(bankTransaction);
});

transactionsRouter.post('/', async (req, res) => {
    const { fromCompanyId, toCompanyId, amount, title, invoiceId } = req.body;

    const bankTransaction = await BankTransaction.create({
        fromCompanyId, toCompanyId, amount, title, invoiceId
    });

    res.json(bankTransaction);
});

module.exports = { transactionsRouter };