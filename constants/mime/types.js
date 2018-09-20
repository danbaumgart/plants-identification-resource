const MimeSubTypes = require('./subTypes');
const MimeTypes = {
	AUDIO: "audio",
	VIDEO: "video",
	IMAGE: "image",
	APPLICATION: "application",
	TEXT: "text",
	isType(mimeType, file) {
		const {contentType} = file || {};
		const [type, subType] = contentType.split('/');
		return type === mimeType && MimeSubTypes[type].values.includes(subType);
	}
};
Object.defineProperties(MimeTypes, {values: {get: () => Object.keys(MimeTypes)}});
Object.freeze(MimeTypes);
module.exports = MimeTypes;
