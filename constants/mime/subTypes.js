const text = {
	PLAIN: "plain",
	HTML: "html",
	JAVASCRIPT: "javascript",
	CSS: "css"
};
const image = {
	BMP: "bmp",
	GIF: "gif",
	JPEG: "jpeg",
	PNG: "png",
	TIFF: "tiff",
	SVG_XML: "svg+xml",
	WEBP: "webp",
	X_ICON: "x-icon",
	VND_MICROSOFT_ICON: "vnd.microsoft.icon"
};
const audio = {
	MPEG: "mpeg",
	OGG: "ogg",
	MIDI: "midi",
	WEBM: "webm",
	WAV: "wav"
};
const video = {
	WEBM: "webm",
	OGG: "ogg"
};
const application = {
	JAVASCRIPT: "javascript",
	OCTET_STREAM: "octet-stream",
	PKCS12: "pkcs12",
	VND_MSPOWERPOINT: "vnd.mspowerpoint",
	XHTML_XML: "xhtml+xml",
	XML: "xml",
	PDF: "pdf"
};
Object.defineProperties(text, {values: {get: () => Object.values(text)}});
Object.defineProperties(image, {values: {get: () => Object.values(image)}});
Object.defineProperties(audio, {values: {get: () => Object.values(audio)}});
Object.defineProperties(video, {values: {get: () => Object.values(video)}});
Object.defineProperties(application, {values: {get: () => Object.values(application)}});
[text, application, audio, video, image].forEach(Object.freeze);
const MimeSubTypes = {audio, image, video, application, text};
module.exports = MimeSubTypes;
