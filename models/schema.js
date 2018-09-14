

const mongoose = require('mongoose');
const {Schema} = mongoose;
const {String, ObjectId} = Schema.Types;
const Attribute = {
	name: String,
	description: [String]
};
exports.User = new Schema({
	name: String,
	email: String,
	password: String
});
exports.Species = new Schema({
	_id: ObjectId,
	family: String,
	genus: String,
	specificEpithet: String,
	commonNames: [String],
	attributes: [Attribute]
});
exports.Families = new Schema({
	_id: String,
	genera: [String],
});
