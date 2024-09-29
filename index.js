require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { companiesRouter } = require('./endpoints/companies');
const { companiesAssignmentRouter } = require('./endpoints/companiesAssignment');
const { reviewsRouter } = require('./endpoints/reviews');
const { invoicesRouter } = require('./endpoints/invoices');
const { transactionsRouter } = require('./endpoints/bankTransactions');
const { analysisRouter } = require('./endpoints/analysis');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Method', 'GET,POST,PUT');
    res.set('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/companies', companiesRouter);
app.use('/companiesAssignments', companiesAssignmentRouter);
app.use('/reviews', reviewsRouter);
app.use('/invoices', invoicesRouter);
app.use('/transactions', transactionsRouter);
app.use(analysisRouter);

const start = async () => {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to database!');

    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`App listening on port ${process.env.PORT}.`);
    });
};

start().catch((e) => console.error('Error while starting application.', e));