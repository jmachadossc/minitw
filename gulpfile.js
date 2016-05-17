var gulp = require('gulp');
var jshint = require('gulp-jshint');	
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');
var header = require('gulp-header');
var concat = require('gulp-concat');

gulp.task('lint', function() {
	return gulp.src('./app/*/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts',function() {
	var headerValue = "Evaluated by Gulp.\n";
	return gulp.src('./app/*/*.js')
		.pipe(concat('combined.js'))
		.pipe(header(headerValue))
		.pipe(gulp.dest('dist'))
		.pipe(rename('combined.min.js'))
		.pipe(header(headerValue))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('./app/*/*.js',['lint','scripts']);
});

gulp.task('default',['lint','scripts','watch']);