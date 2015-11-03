var modernizr = require('modernizr'),
	fs = require('fs'),
	paths = require('./paths');

var task = function () {
	modernizr.build(require('../config').modernizr, function (result) {
		fs.writeFile(paths.dest + 'modernizr.js', result);
	});
};

module.exports = task;