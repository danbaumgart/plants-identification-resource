const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const CONNECTION_STRING = require('./config/connectionString');
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const storage = new GridFsStorage({
	url: CONNECTION_STRING,
	file: (req, file) => Promise.resolve({filename: file.originalname, bucketName: "uploads"})
});
const upload = multer({storage});
exports.uploadSingle = payload => upload.single(payload);
exports.connection = mongoose.connection;
exports.mongo = mongoose.mongo;
exports.Schema = mongoose.Schema;
exports.createModel = (name, schema) => mongoose.model(name, schema);
