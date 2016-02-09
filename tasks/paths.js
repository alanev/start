var src = 'modules/',
	dest = 'cwd/',
	paths = {
		src:  src,
		dest: dest,
		js: {
			src: src + 'g-app/',
			name: {
                defer: 'defer',
                async: 'async',
                enter: 'app.js',
                bundle: 'bundle.js'
            }
		},
		css: {
			src: [
				src + 'i-*/*.{css,scss}',
				src + 'g-*/*.{css,scss}',
				src + 'b-*/*.{css,scss}',
				src + '**/*.{css,scss}'
			],
			name:  'styles.css'
		},
		html: {
			src: 'pages/*.+(htm|html)',
			dest: dest
		},
		img: {
			name: '**/*.{png,jpg,gif,svg}',
			src: [
				src + '**/*.{png,jpg,gif,svg}',
				'!' + src + '**/i-*.png'
			],
			dest: dest + 'img/'
		},
		sprite: {
			block: 'i-icons',
			src: src + '**/i-*.png',
			css: {
				name: 'i-icons' + '.css',
				dest: src + 'i-icons'
			},
			img: {
				name: 'icons.png',
				dest: src + 'i-icons'
			},
			tmpl: src + 'i-icons' + '/' + 'i-icons' + '.hbs'
		}
	};

module.exports = paths;