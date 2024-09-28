const mongoose = require('mongoose');
const CompanyAssignment = mongoose.model('CompanyAssignment', {
    company1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    company2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    lastInteractionDate: Date
});

module.exports = { CompanyAssignment };

