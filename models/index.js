const mongoose = require('mongoose');
const Schemas = require("./schema");
exports.Families = mongoose.model('families', Schemas.Families);
exports.Species = mongoose.model('species', Schemas.Species);
