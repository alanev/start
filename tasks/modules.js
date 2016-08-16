
var fs = require('fs');
var paths = require('./paths');
var path = require('path');
var glob = require('glob');

var tmpls = {
	html: String(fs.readFileSync(__dirname + '/htm.tmpl')),
	css: String(fs.readFileSync(__dirname + '/scss.tmpl')),
	js: String(fs.readFileSync(__dirname + '/js.tmpl'))
};

var task = function () {
	fs.readFile('config.json', function (err, data) {
		if (err) {
			console.log(err)
		} else {
			var file = String(data);
			var modules = JSON.parse(file)['modules'];
			for (var key in modules) {
				var dir = path.join(paths.modules, key);
				if (!fs.existsSync(dir)) {

					var settings = modules[key];

					fs.mkdirSync(dir);
					if (settings.js === true) {
						fs.writeFileSync(path.join(dir, key + '.js'), tmpls.js.replace(/{{name}}/g, key));
					}
					if (settings.html != false) {
						fs.writeFileSync(path.join(dir, key + '.htm'), tmpls.html.replace(/{{name}}/g, key));
					}
					if (settings.css != false) {
						fs.writeFileSync(path.join(dir, key + '.scss'), tmpls.css.replace(/{{name}}/g, key));

						var stylesPath = glob.sync(`${paths.src}*.css`)[0];
						if (fs.existsSync(stylesPath)) {
							var styles = `${fs.readFileSync(stylesPath)}\n@import \'${key}\';`;
							fs.writeFileSync(stylesPath, styles);
						}
					}
				}
			}
		}
	});
};

module.exports = task;
