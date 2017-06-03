'use strict';

const gulp = require('gulp');
const scss = require('gulp-scss');  // https://github.com/jxnblk/css-scss
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps'); // нужны для разработки, помогают в дебаггинге
const gulpIf = require('gulp-if');
const del = require('del');

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
});

// Начальная сборка
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// NODE_ENV=production gulp styles

gulp.task('styles', function() {
	return gulp.src('frontend/styles/main.scss', {base: 'frontend'})
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(scss())
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(debug({title: 'scss'}))
		.pipe(concat('all.css'))
		.pipe(gulp.dest('dest'));
});

gulp.task('assets', function() {
	return gulp.src('frontend/assets/**')
		.pipe(gulp.dest('dest'));
});

gulp.task('clean', function() {
	return del('dest');
});

gulp.task('build', gulp.series('clean', 'styles', 'assets'));