const {mongo, connection} = require('../db');
const MimeTypes = require('../constants/mime/types');
const Grid = require('gridfs-stream');
const Status = require('../constants/status');
const UPLOADS = "uploads";
let Uploads;
connection.on("connected", () => {
	Uploads = Grid(connection.db, mongo);
	Uploads.collection(UPLOADS)
});
exports.uploadFile = (req, res) => res.status(Status.OK).send({file: req.file});
exports.getFiles = (req, res) => Uploads.files.find().toArray((err, files) => {
	if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
	if(!files || files.length === 0) res.status(Status.NOT_FOUND).json({err: "No files exist"});
	res.status(Status.OK).send(files);
});
exports.updateMetadata = (req, res) => !req.params.id ?
	res.status(Status.BAD_REQUEST).send({message: "File id is required"}) :
	Uploads.files.update({_id: req.params.id}, {$set: {metadata: req.body}}, (err, updated) => {
		if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
		res.status(Status.OK).send(updated);
});

exports.getFile = (req, res) => Uploads.files.findOne({
	_id: mongo.ObjectId(req.params.id)
}, (err, file) => {
	if(!file) res.status(Status.NOT_FOUND).json({err: 'No file exists'});
	res.status(Status.OK).send(file);
});
exports.renderFile = mimeType => (req, res) => Uploads.files.findOne({_id: mongo.ObjectId(req.params.id)}, (err, file) => {
	if(!file) return res.status(Status.NOT_FOUND).send({err: 'No file exists'});
	else if(!MimeTypes.isType(mimeType, file)) return res.status(Status.NOT_FOUND).send({err: `Not an ${mimeType} file`});
	else return Uploads.createReadStream(file.filename).pipe(res);
});
exports.removeFile = (req, res) => Uploads.remove({
	_id: mongo.ObjectId(req.params.id),
	root: 'uploads'
}, (err, file) => {
	if(err) res.status(Status.NOT_FOUND).send({err: err});
	res.status(Status.OK).send(file);
});