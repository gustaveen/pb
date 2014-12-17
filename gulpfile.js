/* Imports
   ================================================ */

var config      = require('./gulpconfig.json'),
	gulp        = require('gulp'),
	less        = require('gulp-less'),
	minifyCSS 	= require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps  = require('gulp-sourcemaps'),
	plumber     = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload		= browserSync.reload,
	jshint      = require('gulp-jshint'),
	concat      = require('gulp-concat'),
	seq         = require('run-sequence'),
	stylish		= require('jshint-stylish')
	uglify      = require('gulp-uglify'),
	seq         = require('run-sequence');

// var paths = {
//   watch: 'assets/src/less/*.less',
//   src: 	'assets/src/less/main.less',
//   dist:	'assets/dist/css'
// };


/* Methods
   ========================================================== */

var onError = function(error) {
	notify.onError({
		title    : 'Gulp',
		subtitle : 'Failure!',
		message  : "Error: <%= error.message %>",
		sound    : 'Beep'
	})(error);

	this.emit('end');
};

/* CSS tasks
   ========================================================== */

// Compile & minify css
gulp.task('less', function() {
    return gulp.src(config.css.src)
    	.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(minifyCSS())
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.css.dist));
});

/* JS tasks
   ========================================================== */


// js linter
gulp.task('js-hint', function() {
	return gulp.src(config.js.src)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

// compile & minify
gulp.task('js-scripts', ['js-hint'], function() {
	return gulp.src(config.js.vendor.concat(config.js.src))
		.pipe(sourcemaps.init())
			.pipe(concat('main.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.js.dist));
});

/* BROWSER SYNC tasks
   ========================================================== */

gulp.task('browser-sync', function() {
	browserSync({
	 	server: {
            baseDir: "./"
        },
        port: 8080,
        open  : false
	});
});


// Reload all Browsers
gulp.task('bs-reload', function() {
	browserSync.reload({once: true});
});


/* WATCH tasks
   ========================================================== */

gulp.task('watch', function() {

	//gulp.watch(config.css.watch, ['less', 'bs-css']);

	gulp.watch(config.css.watch, function() {
		seq('less', 'bs-reload');
	});

	gulp.watch(config.js.src, function() {
		seq('js-scripts','bs-reload');
	});

});

gulp.task('default', ['watch', 'browser-sync']);