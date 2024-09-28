const mongoose = require('mongoose');
const Company = mongoose.model('Company', {
    nip: String,
    name: String,
    address: {
        line1: String,
        line2: String,
        city: String,
        zipCode: String
    }
});

module.exports = { Company };