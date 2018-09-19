const RegularExpression = require("../constants/pattern");
const {Boundaries, Flags} = RegularExpression;
class Pattern {
	static validateBuild(build) {
		return (String(build.constructor) === String(Pattern.Builder));
	}
	constructor(build) {
		if(Pattern.validateBuild(build))
		this.value = build.pattern;
		this.flags = build.flags;
	}
	static beginsWithIgnoreCase(pattern) {
		return new this.Builder(pattern)
			.withBoundary(Boundaries.BEGINNING)
			.withFlag(Flags.IGNORE_CASE)
			.build();
	}
	static ignoreCase(pattern) {
		return new this.Builder(pattern)
			.withFlag(Flags.IGNORE_CASE)
			.build();
	}
	get regularExpression() {
		return new RegExp(this.value, this.flags);
	}
	static get Builder() {
		return class Builder {
			constructor(pattern) {
				this.pattern = pattern;
				this.flags = "";
			}
			withBoundary(boundary) {
				if(boundary === Boundaries.BEGINNING && this.pattern.indexOf(Boundaries.BEGINNING) !== 0) {
					this.pattern = `${Boundaries.BEGINNING}${this.pattern}`;
				} else if(boundary === Boundaries.END && this.pattern.substr(-1) !== Boundaries.END) {
					this.pattern = `${this.pattern}${Boundaries.END}`;
				}
				return this;
			}
			withFlag(flag) {
				if(!Flags.values.includes(flag)) return this;
				else if(!this.flags.includes(flag)) this.flags += flag;
				return this;
			}
			build() {
				return new Pattern(this).regularExpression;
			}
		}
	}
}
module.exports = Pattern;
