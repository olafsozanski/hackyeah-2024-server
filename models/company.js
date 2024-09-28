const mongoose = require('mongoose');
const Company = mongoose.model('Company', {
    nip: String,
    name: String,
    startDate: Date,
    verificationYear: Number,
    address: {
        line1: String,
        line2: String,
        city: String,
        zipCode: String
    }
});

module.exports = { Company };