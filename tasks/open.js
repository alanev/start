var open = require('open');

var config = require('../config');

// task
var task = function () {
	open('');
	open(['http://localhost:', config.port, '/index.htm'].join(''));
};

// module
module.exports = task;