const Credentials = {
	USER: "plantIdentificationClient",
	PASS: "K0G2nEsrL9Nyf3RX"
};
const {USER, PASS} = Credentials;
const DATABASE = "plants";
const DOMAIN = "jhwly.gcp.mongodb.net";
const PORT = 27017;
const REPLICA_SET = `${DATABASE}-shard-0`;
const SHARDS = 3;
const Options = {
	ssl: true,
	replicaSet: REPLICA_SET,
	authSource: "admin",
	retryWrites: true
};
const toQueryParameters = (params, property) => {
	const value = Options[property];
	return `${property}=${value}`
};
const OPTIONS = Object.keys(Options).reduce(toQueryParameters, '');
const toReplicaSetMember = (shardPrefix, shardIndex) => `${REPLICA_SET}${shardPrefix}${shardIndex}-${DOMAIN}:${PORT}`;
const HOST = Array(SHARDS).fill("0-0").map(toReplicaSetMember).join(',');
const CONNECTION_STRING = //`mongodb://${USER}:${PASS}@${HOST}/${DATABASE}?${OPTIONS}`;
	"mongodb://plantIdentificationClient:K0G2nEsrL9Nyf3RX@plants-shard-00-00-jhwly.gcp.mongodb.net:27017,plants-shard-00-01-jhwly.gcp.mongodb.net:27017,plants-shard-00-02-jhwly.gcp.mongodb.net:27017/plants?ssl=true&replicaSet=plants-shard-0&authSource=admin&retryWrites=true";
module.exports = CONNECTION_STRING;
