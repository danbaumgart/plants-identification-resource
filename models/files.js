const {connection, mongo} = require('../db');
const Grid = require('gridfs-stream');
const Files = {
	Audio: null,
	Images: null,
	Uploads: null
};
Object.defineProperties(Files, {
	names: {get: () => Object.keys(Files)},
	initialize: {
		get: () =>
			() => Files.names.forEach(upload => {
				Files[upload] = Grid(connection.db, mongo);
				Files[upload].collection(upload);
			})
	}
});
Object.seal(Files);
module.exports = Files;
