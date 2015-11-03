var $ = require('jquery');
var logger = require('../i-test/i-test.js');

$('body').each(function () {
	logger('log');
});