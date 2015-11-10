var util = require('gulp-util');

var beep = function (err) {
	util.log(err);
	util.beep();
};

module.exports = beep;