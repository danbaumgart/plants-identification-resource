const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const DEFAULT_CONNECTION_STRING = "mongodb://plantIdentificationClient:K0G2nEsrL9Nyf3RX@plants-shard-00-00-jhwly.gcp.mongodb.net:27017,plants-shard-00-01-jhwly.gcp.mongodb.net:27017,plants-shard-00-02-jhwly.gcp.mongodb.net:27017/plants?ssl=true&replicaSet=plants-shard-0&authSource=admin&retryWrites=true";
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const storage = new GridFsStorage({
	url: process.env.CONNECTION_STRING || DEFAULT_CONNECTION_STRING,
	file: (req, file) => Promise.resolve({filename: file.originalname, bucketName: "uploads"})
});
const upload = multer({storage});
exports.uploadSingle = payload => upload.single(payload);
exports.connection = mongoose.connection;
exports.mongo = mongoose.mongo;
exports.Schema = mongoose.Schema;
exports.createModel = (name, schema) => mongoose.model(name, schema);
