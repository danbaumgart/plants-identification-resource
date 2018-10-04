const MimeTypes = {
	AUDIO: "audio",
	VIDEO: "video",
	IMAGE: "image",
	APPLICATION: "application",
	TEXT: "text",
	isType(mimeType, file) {
		const {contentType} = file || {};
		const type = contentType && contentType.slice(0, contentType.indexOf('/'));
		return type === mimeType;
	}
};
Object.defineProperties(MimeTypes, {values: {get: () => Object.keys(MimeTypes)}});
Object.freeze(MimeTypes);
module.exports = MimeTypes;
