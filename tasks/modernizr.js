var modernizr = require('modernizr'),
	fs = require('fs'),
	paths = require('./paths');

var task = function () {
	var config = require('../config').modernizr;
	var name = config.classPrefix.replace(/--$/, '');
	modernizr.build(config, function (result) {
		fs.writeFile(`${paths.modules}${name}/${name}.js`, result);
	});
};

module.exports = task;
