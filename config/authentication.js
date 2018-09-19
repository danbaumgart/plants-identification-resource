const Authentication = {
	USER: process.env.USER,
	PASS: process.env.PASS,
	DATABASE: process.env.DATABASE
};
Object.freeze(Authentication);
module.exports = Authentication;
