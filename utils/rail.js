function Rail(key, value) {
	if(!(this instanceof Rail)) return new Rail(key, value);

	this.data = [];

	if(key && value) {
		this.pump(key, value);
	}
}

Rail.prototype = {
	pump: function (key, value) {
		this.data.push({key: key, value: value});
	},
	toString: function () {
		var scripts;

		scripts = this.data.map(function (item) {
			try {
				return ("window['__rail_" + item.key + "__']=" + JSON.stringify(item.value.replace('<', '&lt;')));
			} catch (e) {
				console.error('[Error]', e);
			}
		});

		return '<script>' + scripts.join(';') + '</script>';
	}
};

module.exports = Rail;