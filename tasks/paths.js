var src = 'src/',
	dest = 'build/',
    modules = 'modules/',
	paths = {
		src:  src,
		dest: dest,
        modules: modules,
		img: {
			name: '**/*.{png,jpg,gif,svg}',
			src: [
				modules + '**/*.{png,jpg,gif,svg}',
				'!' + modules + '**/i-*.png'
			],
			dest: dest + 'img/'
		},
		sprite: {
			block: 'i-icons',
			src: modules + '**/i-*.png',
			css: {
				name: 'i-icons' + '.css',
				dest: modules + 'i-icons'
			},
			img: {
				name: 'icons.png',
				dest: modules + 'i-icons'
			},
			tmpl: modules + 'i-icons' + '/' + 'i-icons' + '.hbs'
		}
	};

module.exports = paths;