
/**
 * Modules for tasks
 */ 

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

/**
 * Tasks
 */

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('copy', ['clean'], function () {
    return gulp.src('src/bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('dist'));
});

gulp.task('build-js', ['clean'], function() {
    
	gulp.src('src/js/*.js')		
		.pipe(rename('unitframe.min.js'))
		.pipe(sourcemaps.init())
	    .pipe(uglify())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('dist'))
	    
});

gulp.task('build',['copy', 'build-js']);