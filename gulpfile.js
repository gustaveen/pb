/* Imports
   ================================================ */

var config      = require('./gulpconfig.json'),
	gulp        = require('gulp'),
	less        = require('gulp-less'),
	uglify      = require('gulp-uglify'),
	minifyCSS 	= require('gulp-minify-css'),
	sourcemaps  = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	reload		= browserSync.reload,
	jshint      = require('gulp-jshint');

var paths = {
  watch: 'assets/src/less/*.less',
  src: 	'assets/src/less/main.less',
  dist:	'assets/dist/css'
};


/* CSS tasks
   ========================================================== */

// Compile & minify css
gulp.task('less', function() {
    return gulp.src(config.css.src)
		.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(minifyCSS())
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.css.dist))
        .pipe(reload({stream:true}));
});


/* BROWSER SYNC tasks
   ========================================================== */

gulp.task('browser-sync', function() {
	browserSync({
	 	server: {
            baseDir: "./"
        },
        port: 8080
	});
});

// Reload all Browsers
gulp.task('bs-reload', function() {
	browserSync.reload({once: true});
});


/* WATCH tasks
   ========================================================== */

gulp.task('watch', function() {

	gulp.watch(config.css.watch, ['less']);

	//gulp.watch(config.js.src, [''])

});

gulp.task('default', ['less', 'watch', 'browser-sync']);