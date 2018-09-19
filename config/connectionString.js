const {USER, DATABASE, PASS} = require('./authentication');
const Options = require('./options');
const Host = require('./host');
const CONNECTION_STRING = `mongodb://${USER}:${PASS}@${Host.memberSet}/${DATABASE}?${Options.queryString}`;
module.exports = CONNECTION_STRING;
