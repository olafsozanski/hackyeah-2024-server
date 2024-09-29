const { analyzeReviews } = require('../ai');
const { Invoice } = require('../models/invoice');

const express = require('express');
const { Company } = require('../models/company');
const { Review } = require('../models/review');

const analysisRouter = express.Router();

analysisRouter.post('/companies/by-nip/:nip/analyze', async (req, res) => {

    res.json({
        "analysis": {
            "generalRate": 60,
            "profitabilityRate": 65,
            "credibilityRate": 55,
            "description": "Firma jest umiarkowanie godna zaufania i rentowna, jednak powtarzające się problemy z komunikacją i realizacją zamówień mogą stanowić wyzwanie. Mimo że sprzęt geologiczny został dostarczony na czas i spełniał oczekiwania, to błędy na fakturach i niespodziewane zmiany warunków płatności komplikują współpracę.",
            "mainPoints": [
                "Błędy na fakturach i długi czas oczekiwania na korektę.",
                "Niespodziewane zmiany warunków płatności.",
                "Opóźnienia w dostawach, brak wcześniejszej informacji o zmianach terminów.",
                "Dobra jakość dostarczonego sprzętu geologicznego.",
                "Drobne opóźnienia w komunikacji, ale ogólnie pozytywna obsługa."
            ]
        },
        "company": {
            "address": {
                "line1": "ul. Przemysłowa 12",
                "line2": "Lok. 5",
                "city": "Warszawa",
                "zipCode": "00-001"
            },
            "_id": "66f882b9273528af2c1f9b4b",
            "nip": "1137749935",
            "name": "Bandigo S.A.",
            "startDate": "2023-06-18T00:00:00.000Z",
            "__v": 0
        }
    });
    return;
    const { nip } = req.params;
    const company = await Company.findOne({ nip });
    const reviews = await Review.find({ companyId: company.id });

    const contents = reviews.map(review => review.content);

    res.json({
        analysis: await analyzeReviews(contents),
        company,
    });
});

module.exports = { analysisRouter };