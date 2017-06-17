'use strict';

// https://github.com/nmihalyov/gulp-pure-start/blob/master/gulpfile.js
// http://george.webb.uno/posts/gulp-and-npm-for-front-end-web-development

var gulp 				= require('gulp'),
	sass 				= require('gulp-sass'),
	concat 				= require('gulp-concat'),
	debug 				= require('gulp-debug'),
	sourcemaps 			= require('gulp-sourcemaps'), // нужны для разработки, помогают в дебаггинге
	gulpIf 				= require('gulp-if'),
	del 				= require('del'), // Подключаем библиотеку для удаления файлов и папок
	newer 				= require('gulp-newer'),
	notify 				= require('gulp-notify'),
	combiner 			= require('stream-combiner2').obj,
	browserSync 		= require('browser-sync').create(),
	customizeBootstrap 	= require('gulp-customize-bootstrap'),
	autoprefixer 		= require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	uglify 				= require('gulp-uglify'), // Сжимает JS
	imagemin    		= require('gulp-imagemin'), // Пакет минификации изображений (в зависимостях также идут дополнительные пакеты)
	spawn               = require('child_process').spawn, // Для запуска консольных команд, в частности для Django
	cache        		= require('gulp-cache'); // Работа с кэшом


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// NODE_ENV=production gulp styles

/* ===== */
/* PATHS */
/* ===== */
var source = 'src/',
    dest = 'dist/',
    node_modules = './node_modules';

// Third-party libs
var libs = {
		out: source + 'libs/all/', // сюда попадают все оригиналы библиотек
		outAll: source + 'libs/', // сюда попадают объединенные библиотеки
		in: source + 'libs/all.js', // здесь файл с объединенными библиотеками
		bootstrap: {
        	scss: node_modules + '/bootstrap/scss',
        	js: node_modules + '/bootstrap/dist/js/bootstrap.js'
        },
        fontawesome: {
        	scss: node_modules + '/font-awesome/scss/font-awesome.scss',
        	fonts: node_modules + '/font-awesome/fonts/**'
    	},
        jquery: node_modules + '/jquery/dist/jquery.js',
        tether: node_modules + '/tether/dist/js/tether.js'
    };

var styles = {
	    in: [
	    	source + 'styles/main.scss',
	    	libs.fontawesome.scss
	    ],
	    out: dest + 'css/',
	    watch: source + 'styles/**/*.*',
	    // clean: dest + 'css/',
	    sassOpts: {
	        outputStyle: 'nested',
	        precison: 3,
	        errLogToConsole: true,
	        includePaths: [libs.bootstrap.scss]
	    }
};

var assets = {
	    in: source + 'assets/**',
	    out: dest,
	    watch: source + 'assets/**/*.*',
};

var fonts = {
	    in: source + 'fonts/**',
	    outvendors: source + 'fonts/',
	    out: dest + 'fonts/',
	    watch: source + 'fonts/**',
};

var js = {
	    in: source + 'js/main.js',
	    out: dest+ 'js/',
	    watch: source + 'js/**/*.*'
};

var images = {
	    in: source + 'images/**/*.*',
	    out: dest+ 'images/',
	    watch: source + 'images/**/*.*'
};

/* ====== */
/* STYLES */
/* ====== */

// Собираем стили
gulp.task('styles', function() {
	return combiner( // Создаем комбайнер потоков для применения общего фильтра onError
		gulp.src(styles.in), // Берем источник
		// gulpIf(isDevelopment, sourcemaps.init()), // Если идет процесс разработки, то инициализируем sourcemaps
		sass(styles.sassOpts), // Преобразуем Sass в CSS посредством gulp-sass
		// gulpIf(isDevelopment, sourcemaps.write()), // Если идет процесс разработки, то записываем sourcemaps
		autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }), // Создаем префиксы
		concat('all.css'), // Объединяем все в единый файл
		gulp.dest(styles.out) // Выгружаем результаты в папку
	).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});

/* ===== */
/* FONTS */
/* ===== */

// Собираем сторонние шрифты
gulp.task('fonts:load', function() {
    return gulp.src(libs.fontawesome.fonts)
        .pipe(gulp.dest(fonts.outvendors));
});

// Отправляем все шрифты куда нужно
gulp.task('fonts:build', function() {
    return gulp.src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

gulp.task('fonts', gulp.parallel('fonts:load', 'fonts:build'));

/* ===== */
/* HTML */
/* ===== */

// Собибраем html файлы
gulp.task('assets', function() {
	return combiner(
		gulp.src(assets.in, {since: gulp.lastRun('assets')}), // выбираем только модифицированные файлы
		newer(assets.out), // не позволяет перекопировать уже существующие файлы
		gulp.dest(assets.out) // Выгружаем результаты в папку
	).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});

/* ========== */
/* JavaScript */
/* ========== */

// Собираем сторонние JS в один файл
gulp.task('libs', function() {
    return combiner(
    	gulp.src([ // Берем все необходимые библиотеки
        	libs.jquery, // Берем jQuery
        	libs.tether, // Берем Tether
        	libs.bootstrap.js // Берем Bootstrap
        ]),
        concat('all.js'), // Объединяем все файлы в один в нужном порядке
        gulp.dest(libs.outAll) // Выгружаем в файл
    ).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});

// Собираем весь js в один файл
gulp.task('js', function() {
    return combiner(
    	gulp.src([ // Берем все необходимые библиотеки
        	libs.in, // Берем все сторонние скрипты, объединенные в нужном порядке
        	js.in // берем наши скрипты
        ]),
        uglify(), // Сжимаем JS файлы
        concat('all.js'), // Собираем их в кучу в новом файле
        gulp.dest(js.out) // Выгружаем в папку
    ).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});

/* ====== */
/* IMAGES */
/* ====== */

// Минифицируем изображения и кидаем их в кэш
gulp.task('images', () => {
    return combiner(
    	gulp.src(images.in),
    	cache(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng()])),
    	gulp.dest(images.out)
	).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});

/* ===== */
/* CLEAN */
/* ===== */

gulp.task('clean', function() {
	return del('dest');
});

/* ===== */
/* WATCH */
/* ===== */

gulp.task('watch', function() {
	gulp.watch(styles.watch, gulp.series('styles'));
	gulp.watch(fonts.watch, gulp.series('fonts'));
	gulp.watch(assets.watch, gulp.series('assets'));
	gulp.watch(images.watch, gulp.series('images'));
	gulp.watch(js.watch, gulp.series('libs', 'js'));
});

/* =========== */
/* BROWSERSYNC */
/* =========== */

gulp.task('server', function() {
	browserSync.init({
        // Для работы без Django
        // server: dest // Директория файлов сервера

        // Для работы с Django
        proxy: "localhost:8000"
    });

    browserSync.watch(dest + '**/*.*').on('change', browserSync.reload);
});

/* ====== */
/* DJANGO */
/* ====== */

// Run django server
// https://github.com/pydanny/cookiecutter-django/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/gulpfile.js
gulp.task('django', function(cb) {
  	var cmd = spawn('python', ['../backend/manage.py', 'runserver'], {stdio: 'inherit'});
  	cmd.on('close', function(code) {
    	console.log('django exited with code ' + code);
    	cb(code);
  	});
});

/* ==== */
/* MAIN */
/* ==== */

gulp.task('build', gulp.series('clean', 'styles', 'assets', 'images', 'fonts', 'libs', 'js'));

gulp.task('dev',
	gulp.series('build', 
		gulp.parallel('watch', 'server')
	)
);
