import {analyzeReviews} from '../ai';

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

export { analysisRouter };