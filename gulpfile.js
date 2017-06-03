'use strict';

const gulp = require('gulp');
const scss = require('gulp-scss');  // https://github.com/jxnblk/css-scss
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');

// HOW TO CREATE TASK
gulp.task('example:callback', function(callback) {
	console.log("Hello");
	callback();
});

gulp.task('example:ls', function() {
	return require('child_process').spawn('ls', ['.'], {stdio: 'inherit'});
});

gulp.task('example:series', gulp.series('example:callback', 'example:ls'));

gulp.task('example:parallel', gulp.parallel('example:callback', 'example:ls'));

// ФАЙЛОВЫЕ ПОТОКИ
gulp.task('example:dest', function() {
	return gulp.src('frontend/**/*.*')
		.on('data', function(file) {
			console.log(file);
		})
		.pipe(gulp.dest('dest'));
})

// Начальная сборка
gulp.task('styles', function() {
	return gulp.src('frontend/styles/main.scss', {base: 'frontend'})
		.pipe(sourcemaps.init())
		.pipe(scss())
		.pipe(sourcemaps.write())
		.pipe(debug({title: 'scss'}))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('dest'));
})