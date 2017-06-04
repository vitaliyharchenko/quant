'use strict';

const gulp = require('gulp');
const scss = require('gulp-scss');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps'); // нужны для разработки, помогают в дебаггинге
const gulpIf = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;
var browserSync = require('browser-sync').create();
var customizeBootstrap = require('gulp-customize-bootstrap');
var autoprefixer = require('gulp-autoprefixer');


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// NODE_ENV=production gulp styles

// source and distribution folder
var
    source = 'frontend/',
    dest = 'dest/';

gulp.task('compileBootstrap', function() {
  return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(customizeBootstrap('frontend/styles/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('dest'));
});

gulp.task('styles', function() {
	return combiner(
		gulp.src('frontend/styles/main.scss', {base: 'frontend'}),
		gulpIf(isDevelopment, sourcemaps.init()),
		sass().on('error', sass.logError),
		gulpIf(isDevelopment, sourcemaps.write()),
		autoprefixer(),
		concat('all.css'),
		gulp.dest('dest')
	).on('error', notify.onError())
});

gulp.task('assets', function() {
	return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
		.pipe(newer('dest'))
		.pipe(debug())
		.pipe(gulp.dest('dest'));
});

gulp.task('clean', function() {
	return del('dest');
});


gulp.task('watch', function() {
	gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
	gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('server', function() {
	browserSync.init({
        server: 'dest'
    });

    browserSync.watch('dest/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'styles', 'assets'));

gulp.task('dev',
	gulp.series('build', 
		gulp.parallel('watch', 'server')
	)
);
