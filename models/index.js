const {createModel, upload} = require('../db');
const Schemas = require("./schema");
const Files = require('./files');
exports.Families = createModel('families', Schemas.Family);
exports.Species = createModel('species', Schemas.Specimen);
exports.Uploads = Files.Uploads;
