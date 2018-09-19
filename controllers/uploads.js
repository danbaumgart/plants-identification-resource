const {mongo, connection} = require('../db');
const Grid = require('gridfs-stream');
const Status = require('../constants/status');
//const {Uploads} = require('../models');
// exports.getAudioFiles = (req, res) => Uploads.files.find().toArray((err, audio) => {
// 	if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
// 	res.status(Status.OK).send(audio);
// });
// exports.getImageFiles = (req, res) => Images.files.find().toArray((err, images) => {
// 	if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
// 	res.status(Status.OK).send(images);
// });
let Uploads;
connection.on("connected", () => {
	Uploads = Grid(connection.db, mongo);
	Uploads.collection("uploads")
});
exports.uploadFile = (req, res) => res.status(Status.OK).send({ file: req.file });
// // @route GET /files
// // @desc  Display all files in JSON
exports.getFiles = (req, res) => Uploads.files.find().toArray((err, files) => {
	if(err) res.status(Status.INTERNAL_SERVER_ERROR).send(err);
	if(!files || files.length === 0) res.status(Status.NOT_FOUND).json({err: "No files exist"});
	res.status(Status.OK).send(files);
});
// // @route GET /files/:filename
// // @desc  Display single file object
exports.getFile = (req, res) => Uploads.files.findOne({
	_id: mongo.ObjectId(req.params.id)}, (err, file) => {
	if(!file) res.status(Status.NOT_FOUND).json({err: 'No file exists'});
	res.status(Status.OK).send(file);
});
exports.renderFile = type => (req, res) => Uploads.files.findOne({
	_id: mongo.ObjectId(req.params.id)
}, (err, file) => {
	if(!file) return res.status(Status.NOT_FOUND).send({err: 'No file exists'});
	else if(file.contentType.indexOf(type) !== 0) return res.status(Status.NOT_FOUND).send({err: `Not an ${type} file`});
	else return Uploads.createReadStream(file.filename).pipe(res);
});
exports.removeFile = (req, res) => Uploads.remove({
	_id: mongo.ObjectId(req.params.id),
	root: 'uploads'
}, (err, file) => {
		if(err) res.status(Status.NOT_FOUND).send({err: err});
		res.status(Status.OK).send(file);
	});
// app.get('/api/files/:id/audio', (req, res) => {
// 	gfs.files.findOne({_id: mongo.ObjectId(req.params.id)}, (err, file) => {
// 		// Check if file
// 		if(!file || file.length === 0) {
// 			return res.status(404).json({
// 				err: 'No file exists'
// 			});
// 		}
//
// 		// Check if image
// 		if(file.contentType === 'audio/mp3') {
// 			// Read output to browser
// 			const readstream = gfs.createReadStream(file.filename);
// 			readstream.pipe(res);
// 		} else {
// 			res.status(404).json({
// 				err: 'Not an audio file'
// 			});
// 		}
// 	});
// });
// // @route DELETE /files/:id
// // @desc  Delete file
// app.delete('/api/files/:id', (req, res) => {
// 	gfs.remove({_id: mongo.ObjectId(req.params.id), root: 'uploads'}, err => {
// 		if(err) res.status(404).send({err: err});
// 		res.redirect('/');
// 	});
// });
