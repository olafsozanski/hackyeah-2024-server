const mongoose = require('mongoose');
const Invoice = mongoose.model('Invoice', {
    fromCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    toCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    item: String,
    amount: Number,
    issueDate: Date,
    paymentDate: Date,
    paid: Boolean
});

module.exports = { Invoice };