const express = require('express');
const app = express();
const mongooseDb = require('./db');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app;