
var fs = require('fs');
var paths = require('./paths');
var path = require('path');

var tmpls = {
	html: String(fs.readFileSync(__dirname + '/tmpl.htm')),
	css: String(fs.readFileSync(__dirname + '/tmpl.scss'))
};

var task = function () {
	fs.readFile('config.json', function (err, data) {
		if (err) {
			console.log(err)
		} else {
			var file = String(data);
			var modules = JSON.parse(file)['modules'];
			for (var key in modules) {
				var dir = path.join(paths.src, key);
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir);
					fs.writeFileSync(path.join(dir, key + '.htm'), tmpls.html);
					fs.writeFileSync(path.join(dir, key + '.scss'), tmpls.css.replace('{{name}}', key));
				}
			}
		}
	});
};

module.exports = task;