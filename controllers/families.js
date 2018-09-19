const Status = require("../constants/status");
const Models = require("../models");
const Pattern = require("../utils/pattern");
exports.getFamilies = (req, res) => {
	const query = {};
	if(req.query.name) query.name = Pattern.beginsWithIgnoreCase(req.query.name);
	if(req.query.genera) query.genera = Pattern.beginsWithIgnoreCase(req.query.genera);
	Models.Families.find(query, (err, families) => {
		if(err) res.status(Status.INTERNAL_SERVER_ERROR).json(err);
		res.status(Status.OK).json(families.map(family => ({
			name: family.name,
			genera: query.genera ? family.genera.filter(genera => query.genera.test(genera)) : family.genera
		})));
	})
};
exports.getFamily = (req, res) => {
	const {id: name} = req.params || {};
	if(!name) res.send(new Error("Family name required"));
	const query = {name};
	if(req.query.genera) query.genera = Pattern.beginsWithIgnoreCase(req.query.genera);
	Models.Families.findOne(query, (err, family) => {
		if(err) res.send(err);
		res.status(Status.OK).json({
			name: family.name,
			genera: query.genera ? family.genera.filter(genera => query.genera.test(genera)) : family.genera
		});
	})
};