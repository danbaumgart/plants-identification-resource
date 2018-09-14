const mongoose = require('mongoose');
const CONNECTION_STRING = require('./config/connectionString');
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
