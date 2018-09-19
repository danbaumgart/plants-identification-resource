const {DATABASE} = require('./authentication');
const Options = {
	ssl: true,
	replicaSet: `${DATABASE}-shard-0`,
	authSource: "admin",
	retryWrites: true
};
const toQueryParameters = (params, property) => params.length > 0 ?
	`${params}&${property}=${Options[property]}` :
	`${property}=${Options[property]}`;
Object.defineProperties(Options, {
	queryString: {get: () => Object.keys(Options).reduce(toQueryParameters, '')}
});
Object.freeze(Options);
module.exports = Options;