
var fs = require('fs');
var paths = require('./paths');
var path = require('path');

var tmpls = {
	html: String(fs.readFileSync(__dirname + '/htm.tmpl')),
	css: String(fs.readFileSync(__dirname + '/scss.tmpl')),
	js: String(fs.readFileSync(__dirname + '/js.tmpl')),
	issues: String(fs.readFileSync(__dirname + '/issues.tmpl'))
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
                    
                    var settings = modules[key];
                    
					fs.mkdirSync(dir);
                    if (settings.js === true) {
					   fs.writeFileSync(path.join(dir, key + '.js'), tmpls.js.replace('{{name}}', key));
                    }
                    if (settings.issues != false && !/^(g-|u-)/.test(key)) {
					   fs.writeFileSync(path.join(dir, key + '.issues.md'), tmpls.issues.replace('{{name}}', key));
                    }
                    if (settings.html != false) {
					   fs.writeFileSync(path.join(dir, key + '.htm'), tmpls.html);
                    }
                    if (settings.css != false) {
					   fs.writeFileSync(path.join(dir, key + '.scss'), tmpls.css.replace('{{name}}', key));
                    }
				}
			}
		}
	});
};

module.exports = task;