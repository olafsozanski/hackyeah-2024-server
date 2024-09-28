require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { companiesRouter} = require('./endpoints/companies');
const { companiesAssignmentRouter} = require('./endpoints/companiesAssignment');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Method', 'GET,POST,PUT');
    next();
});

app.use('/companies', companiesRouter);
app.use('/companiesAssignment', companiesAssignmentRouter);

const start = async () => {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to database!');

    app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}.`);
    });
};

start().catch((e) => console.error('Error while starting application.', e));