'use strict';

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
	uglify 				= require('gulp-uglify'); // Сжимает JS


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// NODE_ENV=production gulp styles

// TODO: задать пути для сборки и node_modules
var
    source = 'frontend/',
    dest = 'dest/';

var node_modules = './node_modules';

// Third-party libs
var libs = {
		out: source + 'libs/all/', // сюда попадают все оригиналы библиотек
		outAll: source + 'libs/', // сюда попадают объединенные библиотеки
		in: source + 'libs/all.js', // здесь файл с объединенными библиотеками
		bootstrap: {
        	scss: node_modules + '/bootstrap/scss',
        	js: node_modules + '/bootstrap/dist/js/bootstrap.js'
        },
        jquery: node_modules + '/jquery/dist/jquery.js',
        tether: node_modules + '/tether/dist/js/tether.js'
    };

var styles = {
    in: source + 'styles/main.scss',
    out: dest,
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

var js = {
    in: source + 'js/main.js',
    out: dest,
    watch: source + 'js/**/*.*'
};

// var img = {
//     in: source + 'images/**/*',
//     out: dest + 'images/',
//     watch: source + 'images/**/*',
//     clean: dest + 'images/'
// };

// Собираем стили
gulp.task('styles', function() {
	return combiner( // Создаем комбайнер потоков для применения общего фильтра onError
		gulp.src(styles.in), // Берем источник
		gulpIf(isDevelopment, sourcemaps.init()), // Если идет процесс разработки, то инициализируем sourcemaps
		sass(styles.sassOpts), // Преобразуем Sass в CSS посредством gulp-sass
		gulpIf(isDevelopment, sourcemaps.write()), // Если идет процесс разработки, то записываем sourcemaps
		autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }), // Создаем префиксы
		concat('all.css'), // Объединяем все в единый файл
		gulp.dest(styles.out) // Выгружаем результаты в папку
	).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});


// Собибраем html файлы
gulp.task('assets', function() {
	return combiner(
		gulp.src(assets.in, {since: gulp.lastRun('assets')}), // выбираем только модифицированные файлы
		newer(assets.out), // не позволяет перекопировать уже существующие файлы
		gulp.dest(assets.out) // Выгружаем результаты в папку
	).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});

// Собираем сторонние JS в папку libs для хранения актуальной версии сторонней библиотеки на случай поломки
gulp.task('libs:copy', function() {
    return combiner(
    	gulp.src([ // Берем все необходимые библиотеки
        	libs.jquery, // Берем jQuery
        	libs.tether, // Берем Tether
        	libs.bootstrap.js // Берем Bootstrap
        ]),
        newer(libs.out), // не позволяет перекопировать уже существующие файлы
        gulp.dest(libs.out) // Выгружаем в папку
    ).on('error', notify.onError()) // Обработчик ошибок для всех участников комбайнера
});

// Собираем сторонние JS в один файл
gulp.task('libs:concat', function() {
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

gulp.task('libs', gulp.parallel('libs:copy', 'libs:concat'));

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

gulp.task('clean', function() {
	return del('dest');
});

gulp.task('watch', function() {
	gulp.watch(styles.watch, gulp.series('styles'));
	gulp.watch(assets.watch, gulp.series('assets'));
	gulp.watch(js.watch, gulp.series('libs', 'js'));
});

gulp.task('server', function() {
	browserSync.init({
        server: dest // Директория файлов сервера
    });

    browserSync.watch(dest + '**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'styles', 'assets', 'libs', 'js'));

gulp.task('dev',
	gulp.series('build', 
		gulp.parallel('watch', 'server')
	)
);
