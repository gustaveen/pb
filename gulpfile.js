/* Imports
   ================================================ */

var config      = require('./gulpconfig.json'),
	gulp        = require('gulp'),
	less        = require('gulp-less'),
	minifyCSS 	= require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps  = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	reload		= browserSync.reload,
	seq         = require('run-sequence');


/* CSS tasks
   ========================================================== */

// Compile & minify css
gulp.task('less', function() {
    return gulp.src(config.css.src)
		.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(minifyCSS())
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.css.dist));
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

	gulp.watch(config.css.watch, function() {
		seq('less', 'bs-reload');
	});

});

gulp.task('default', ['less', 'watch', 'browser-sync']);