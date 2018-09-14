const Models = require("../models");
const toPattern = stringValue => new RegExp(`${stringValue}`, 'i');
exports.getPlants = (req, res) => {
	const {family, genus, specificEpithet, commonNames} = req.query || {};
	const query = Object.assign({},
		family && {family: toPattern(family)},
		genus && {genus: toPattern(genus)},
		specificEpithet && {specificEpithet: toPattern(specificEpithet)},
		commonNames && {commonNames: toPattern(specificEpithet)}
	);
	Models.Species.find(query, (err, species) => {
		if(err) res.send(err);
		res.json(species);
	})
};
exports.getPlant = (req, res) => {
	const {id} = req.params || {};
	Models.Species.findOne({_id: id}, (err, plant) => {
		if(err) res.send(err);
		res.json(plant);
	})
};
