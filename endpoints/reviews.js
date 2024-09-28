const express = require('express');
const { Review } = require('../models/review');
const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res) => {
    const review = await Review.find({});
    res.render('reviews/index', { company });
});

reviewsRouter.post('/', async (req, res) => {
    const { companyId, content, createdAt } = req.body;

    const review = await Review.create({
        companyId, content, createdAt
    });

    res.redirect('/reviews/' + review._id);
});

module.exports = { reviewsRouter };