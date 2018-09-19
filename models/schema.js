const {Schema} = require('../db');
const {String, ObjectId} = Schema.Types;
const Attribute = {
	name: String,
	description: [String]
};
const Family = new Schema({
	name: String,
	genera: [String],
});
const Specimen = new Schema({
	_id: ObjectId,
	family: {
		type: String,
		required: true
	},
	genus: {
		type: String,
		required: true
	},
	specificEpithet: {
		type: String,
		required: true
	},
	commonNames: [String],
	attributes: [Attribute]
}, {
	versionKey: false
});
exports.Specimen = Specimen;
exports.Family = Family;
