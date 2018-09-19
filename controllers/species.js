const Status = require("../constants/status");
const Pattern = require("../utils/pattern");
const {Species} = require("../models");
exports.getSpecies = (req, res) => {
	const queryParameters = req.query ? Object.keys(req.query) : [];
	const query = queryParameters.reduce((queryObject, parameter) => Object.assign(queryObject, {
		[parameter]: Pattern.ignoreCase(req.query[parameter])
	}), {});
	Species.find(query, (err, species) => {
		if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
		res.status(Status.OK).json(species);
	})
};
exports.getSpecimen = (req, res) => {
	if(!req.params.id) res.status(Status.BAD_REQUEST).send({message: "Identifier is required"});
	Species.findById(req.params.id, (err, specimen) => {
		if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
		res.status(Status.OK).json(specimen);
	})
};
exports.updateSpecimen = (req, res) => {
	if(!req.params.id) res.status(Status.BAD_REQUEST).send({message: "Identifier is required"});
	Species.findByIdAndUpdate(req.params.id, req.body, (err, specimen) => {
		if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
		res.status(Status.OK).json({message: "Specimen updated", specimen});
	});
};
exports.createSpecimen = (req, res) => {
	if(!req.body) res.status(Status.BAD_REQUEST).send({message: "Missing request body"});
	const specimen = new Species(req.body);
	specimen.save((err) => {
		if (err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
		res.status(Status.OK).json({message: 'Specimen created!', specimen});
	});
};
exports.removeSpecimen = (req, res) => {
	if(!req.params.id) res.status(Status.BAD_REQUEST).send({message: "Identifier is required"});
	Species.findByIdAndRemove(req.params.id, (err, specimen) => {
		if (err) return res.status(Status.INTERNAL_SERVER_ERROR).send(err);
		res.status(Status.OK).json({message: "Specimen deleted", id: specimen._id});
	});

};
