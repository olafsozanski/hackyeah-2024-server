const mongoose = require('mongoose');
const BankTransaction = mongoose.model('BankTransaction', {
    fromCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    toCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    amount: Number,
    title: String,
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }
});

module.exports = { BankTransaction };