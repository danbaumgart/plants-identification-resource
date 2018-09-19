const Authentication = {
	USER: process.env.USER,
	PASS: process.env.PASS,
	DATABASE: "plants"
};
Object.freeze(Authentication);
module.exports = Authentication;
