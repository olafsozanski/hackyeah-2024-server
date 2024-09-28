const express = require('express');
const { Review } = require('../models/review');
const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res) => {
    const review = await Review.find({});
    res.json(review);
});

reviewsRouter.post('/', async (req, res) => {
    const { companyId, content, createdAt } = req.body;

    const review = await Review.create({
        companyId, content, createdAt
    });

    res.json(review)
});

module.exports = { reviewsRouter };