const Boundaries = {
	BEGINNING: "^",
	END: "$"
};
const Flags = {
	IGNORE_CASE: "i",
	GLOBAL: "g",
	MULTILINE: "m",
	UNICODE: "u",
	STICKY: "y",
};
Object.defineProperty(Flags, 'values', {
	get: () => Object.values(Flags)
});
Object.defineProperty(Boundaries, 'values', {
	get: () => Object.values(Boundaries)
});
[Boundaries, Flags].forEach(Object.freeze);
exports.Boundaries = Boundaries;
exports.Flags = Flags;
