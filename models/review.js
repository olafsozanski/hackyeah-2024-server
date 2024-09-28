const mongoose = require('mongoose');
const Review = mongoose.model('Review', {
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    content: String,
    createdAt: Date
});

module.exports = { Review };