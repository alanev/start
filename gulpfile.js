// Modules
var gulp = require('gulp'),

	// file
	concat = require('gulp-concat'),
	open = require('gulp-open'),
	ftp = require('gulp-ftp'),
	zip = require('gulp-zip'),
	clean = require('gulp-rimraf'),
	flatten = require('gulp-flatten'),
	
	// server
	browserSync = require('browser-sync'),

	// css
	postcss = require('gulp-postcss'),
	cssprocessors = [
		require('postcss-mixins'),
		require('postcss-nested-props'),
		require('postcss-nested'),
		require('postcss-custom-media'),
		require('postcss-css-variables'),
		require('postcss-simple-vars'),
		require('postcss-short')({
			deny: ['padding','margin','text','min-size','max-size']
		}),
		require('postcss-selector-not'),
		require('postcss-focus'),
		require('postcss-color-function'),
		require('postcss-responsive-type'),
		require('autoprefixer-core')
	],
	//minify
	minify = require('gulp-minify-css'),
	minifyoptions = {
		advanced: false
	},

	// html
	postxml = require('gulp-postxml'),
	postxmlplugins = [
		require('postxml-import'),
		require('postxml-custom-tags'),
		require('postxml-placeholder'),
		require('postxml-beml'),
		require('postxml-imgalt')
	],

	// js
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
			src + 'i-*/*.css',
			src + 'g-*/*.css',
			src + 'b-*/*.css',
			src + '**/*.css'
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
		.pipe(postxml(postxmlplugins))
		.pipe(gulp.dest(html.dest))
		;
	gulp.src(dest + 'index.htm')
		.pipe(browserSync.reload({
			stream: true
		}))
		;
});

/*-- Css Tasks --*/
gulp.task('css:dev', function () {
	gulp.src(css.src)
		.pipe(concat(css.name))
		.pipe(postcss(cssprocessors))
		.pipe(gulp.dest(dest))
		.pipe(browserSync.reload({
			stream: true
		}))
		;
});
gulp.task('css:build', function () {
	gulp.src(css.src)
		.pipe(concat(css.name))
		.pipe(postcss(cssprocessors))
		.pipe(minify(minifyoptions))
		.pipe(gulp.dest(dest));
});

/*-- Js Tasks --*/
gulp.task('js:dev', function () {
	gulp.src(js.src)
		.pipe(concat(js.name))
		.pipe(gulp.dest(dest))
		.pipe(browserSync.reload({
			stream: true
		}))
		;
});
gulp.task('js:build', function () {
	gulp.src(js.src)
		.pipe(concat(js.name))
		.pipe(uglify())
		.pipe(gulp.dest(dest))
		;
});

/*-- Images Tasks --*/
gulp.task('img:dev',['img:clean','img:copy']);
gulp.task('img:build',['img:clean','img:min']);
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
	gulp.src(img.dest)
		.pipe(clean())
		;
});

/*-- Sprite Tasks --*/
gulp.task('sprite:make', function () {
	var spriteData = gulp.src(sprite.src)
		.pipe(spritesmith({
			imgName: sprite.img.name,
			cssName: sprite.css.name,
			cssTemplate: sprite.tmpl,
			padding: 5
		}));
	spriteData.img
		.pipe(gulp.dest(sprite.img.dest));
	spriteData.css
		.pipe(gulp.dest(sprite.css.dest));
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
gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: 'cwd',
			index: 'index.htm'
		}
	});
});
gulp.task('open',function () {
	gulp.src(dest + 'index.htm')
		// .pipe(open({ uri: 'http://localhost:3000/index.htm' }))
		// .pipe(open('<%= file.cwd %>', { app: 'explorer' }))
		;
});
gulp.task('watch', ['html','css:dev','js:dev', 'browserSync'], function () {
	
	gulp.watch([html.src, src + '**/*.htm'], ['html']);

	gulp.watch(src + '**/*.css', ['css:dev']);
	gulp.watch(src + '**/*.js', ['js:dev']);
});

/*-- Dev Build --*/
gulp.task('build', ['img:build','css:build','js:build']);
