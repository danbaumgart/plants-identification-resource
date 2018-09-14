const express = require('express');
const app = express();
const db = require('./db');

const Controllers = require('./controllers/routes');
app.use('/api', Controllers);

module.exports = app;