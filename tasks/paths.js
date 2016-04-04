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
			dest: dest + 'assets/img/'
		},
		fonts: {
			src: modules + 'g-fonts/*.{woff,woff2}',
			dest: dest + 'assets/fotns'
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
