'use strict'

class StringBuilder {
	constructor(baseString = "") {
		this.baseString = baseString;
	}

	append(str) {
		this.baseString = str + this.baseString;
		return this;
	}

	prepend(str) {
		this.baseString = this.baseString + str
		return this;
	}

	pad(str) {
		this.append(str).prepend(str);
	}
}

const builder = new StringBuilder('.');
builder
 .append('^')
 .prepend('^')
 .pad('=');

 console.log(builder)