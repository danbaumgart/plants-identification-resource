const Options = require('./options');
const Host = {
	DOMAIN: process.env.DOMAIN,
	PORT: 27017,
	SHARDS: 3
};
const toMember = (shardPrefix, shardIndex) => `${shardPrefix}${shardIndex}-${Host.DOMAIN}:${Host.PORT}`;
Object.defineProperties(Host, {
	memberSet: {get: () => Array(Host.SHARDS).fill(`${Options.replicaSet}0-0`).map(toMember).join(',')}
});
Object.freeze(Host);
module.exports = Host;