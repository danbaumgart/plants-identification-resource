const Models = require("../models");
const toStartsWithPattern = stringValue => new RegExp(`^${stringValue}`, 'i');
exports.getFamilies = (req, res) => {
	const {name, genera} = req.query || {};
	const query = {};
	if(name) query._id = toStartsWithPattern(name);
	if(genera) query.genera = toStartsWithPattern(genera);
	Models.Families.find(query, (err, families) => {
		if(err) res.send(err);
		res.json(families.map(family => ({
			name: family._id,
			genera: query.genera ? family.genera.filter(genus => query.genera.test(genus)) : family.genera
		})));
	})
};
exports.getFamily = (req, res) => {
	const {id} = req.params || {};
	if(!id) res.send(new Error("Family is required"));
	const query = {_id: id};
	if(req.query.genera) query.genera = toStartsWithPattern(req.query.genera);
	Models.Families.findOne(query, (err, family) => {
		if(err) res.send(err);
		res.json({
			name: family._id,
			genera: query.genera ? family.genera.filter(genus => query.genera.test(genus)) : family.genera
		});
	})
};