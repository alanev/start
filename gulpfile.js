// Modules
var gulp = require('gulp'),

	// file
	concat = require('gulp-concat'),
	open = require('open'),
	ftp = require('gulp-ftp'),
	zip = require('gulp-zip'),
	del = require('del'),
	flatten = require('gulp-flatten'),
	runSequence = require('run-sequence'),
	sourcemaps = require('gulp-sourcemaps'),
	
	// utils
	merge = require('merge-stream'),
	plumber = require('gulp-plumber'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	
	// server
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),

	// css
	postcss = require('gulp-postcss'),
	cssprocessors = [
		require('postcss-mixins')(),
		require('postcss-nested-props')(),
		require('postcss-nested')(),
		require('postcss-custom-media')(),
		require('postcss-simple-vars')(),
		require('postcss-custom-selectors')(),
		require('postcss-short-size'),
		require('postcss-short-position'),
		require('postcss-selector-not')(),
		require('postcss-focus')(),
		require('postcss-color-function')(),
		require('autoprefixer')(),
		// optimisations
		require('postcss-discard-comments')(),
		require('postcss-discard-empty')(),
		require('postcss-calc')(),
		require('postcss-normalize-url')(),
		require('postcss-minify-selectors')(),
		require('postcss-merge-longhand')(),
		// require('postcss-font-family')(),
		require('postcss-convert-values')({
			length: false,
			angle: false
		}),
		require('postcss-colormin')(),
		require('postcss-merge-rules')(),
		// require('postcss-discard-unused')(),
		require('postcss-zindex')(),
		require('postcss-reduce-idents')(),
		require('css-mqpacker')(),
		require('csswring')()
	],

	// html
	postxml = require('gulp-postxml'),
	postxmlplugins = [
		require('postxml-import')({
			selector: 'import[block]',
			attr: 'block',
			path: function (block) {
				return 'blocks/' + block + '/' + block + '.htm';
			}
		}),
		// require('postxml-beml')(),
		// require('postxml-imgalt')(),
		// require('postxml-placeholder')(),
		// require('postxml-image-size')({
		// 	cwd: 'cwd'
		// }),
		// require('postxml-repeat')()
	],

	// js
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),

	// image
	imagemin = require('gulp-imagemin'),
	spritesmith = require('gulp.spritesmith'),

	pkg = require('./package.json'),
	ftppass = require('./ftp.json'),

	varEnd = true
	;

// Ftp path
ftppass.remotePath = "/" + pkg.name;

// Options
var src = 'blocks/',
	dest = 'cwd/',
	html = {
		src: 'pages/*.+(htm|html)',
		dest: dest
	},
	css = {
		src: [
			src + 'i-*/*.{css,scss}',
			src + 'g-*/*.{css,scss}',
			src + 'b-*/*.{css,scss}',
			src + '**/*.{css,scss}'
		],
		name:  pkg.name + '.css'
	},
	js = {
		src: [
			src + 'i-*/*.js',
			src + 'g-*/*.js',
			src + 'b-*/*.js',
			src + '**/*.js'
		],
		name: pkg.name + '.js'
	},

	sprite = {
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
	},
	img = {
		name: '**/*.{png,jpg,gif,svg}',
		src: [
			src + '**/*.{png,jpg,gif,svg}',
			'!' + src + '**/i-*.png'
		],
		dest: dest + 'img/'
	}
	;

/*-- Upload Tasks --*/
gulp.task('ftp',function () {
	gulp.src([
			dest + '**'
		])
		.pipe(ftp(ftppass))
		;
});
gulp.task('zip',function () {
	gulp.src([
			dest + '**'
		])
		.pipe(zip(pkg.name + '.zip'))
		.pipe(ftp(ftppass))
		;
	gulp.src([
			src + '**',
			dest + '**',
			'*',
			'!node_modules',
			'!src',
			'!ftp.json'
		],{
			base: __dirname
		})
		.pipe(zip(pkg.name + '.dev.zip'))
		.pipe(ftp(ftppass))
		;
});

/*-- Html Tasks --*/
gulp.task('html', function () {
	gulp.src(html.src)
		// .pipe(sourcemaps.init())
		.pipe(postxml(postxmlplugins))
		// .pipe(sourcemaps.write(process.cwd() + '/maps'))
		.pipe(gulp.dest(html.dest))
		;
	gulp.src(dest + 'index.htm')
		.pipe(connect.reload())
		;
});

/*-- Css Tasks --*/
gulp.task('css', function () {
	gulp.src(css.src)
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(concat(css.name))
		.pipe(postcss(cssprocessors))
		// .pipe(sourcemaps.write(process.cwd() + '/maps'))
		.pipe(plumber.stop())
		.pipe(gulp.dest(dest))
		.pipe(connect.reload())
		;
});

/*-- Js Tasks --*/
gulp.task('js:dev', function () {
	return browserify('blocks/app/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(dest))
		;
});
gulp.task('js:build', function () {
	return browserify('blocks/app/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(dest))
		;
});

/*-- Images Tasks --*/
gulp.task('img', function () {
	runSequence('img:clean', 'img:min');
});
gulp.task('img:dev', ['img:clean', 'img:copy']);
gulp.task('img:build', ['img:clean', 'img:min']);
gulp.task('img:min',function () {
	gulp.src(img.src)
		.pipe(flatten())
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true
		}))
		.pipe(gulp.dest(img.dest))
		;
});
gulp.task('img:copy',function () {
	gulp.src(img.src)
		.pipe(flatten())
		.pipe(gulp.dest(img.dest))
		;
});
gulp.task('img:clean',function () {
	del([
		img.dest + '**',
		img.dest
	]);
});
gulp.task('sprite', function () {
	runSequence('sprite:make', 'img:clean', 'img:min');
});
gulp.task('sprite:make', function () {
	var spriteData = gulp.src(sprite.src)
		.pipe(spritesmith({
			imgName: sprite.img.name,
			cssName: sprite.css.name,
			cssTemplate: sprite.tmpl,
			padding: 5
		}));
	var spriteImg = spriteData.img
		.pipe(gulp.dest(sprite.img.dest));
	var spriteCss = spriteData.css
		.pipe(gulp.dest(sprite.css.dest));
	
	return merge(spriteImg, spriteCss);
});

gulp.task('done',function () {
	console.log('done');
});

/*-- Dev Tasks --*/
var server = {
	root: dest,
	port: 8001,
	livereload: true
};
gulp.task('connect', function () {
	connect.server(server);
});

gulp.task('open',function () {
	open(process.cwd());
	open('http://localhost:8001/index.htm');
});

gulp.task('dev', ['img', 'html', 'css', 'js:dev', 'watch', 'open']);
gulp.task('watch', ['connect'], function () {
	
	watch([html.src, src + '**/*.htm'], function () {
		gulp.start('html');
	});

	watch(src + '**/*.{css,scss}', function () {
		gulp.start('css');
	});
	watch(src + '**/*.js', function () {
		gulp.start('js:dev');
	});
	
	watch(img.src, function () {
		gulp.start('img');
	});
	
	watch(sprite.src, function () {
		gulp.start('sprite');
	});
	
});

/*-- Dev Build --*/
gulp.task('build', function () {
	runSequence('img', ['css','js:build'], ['ftp', 'zip']);
});
