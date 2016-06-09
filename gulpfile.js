var gulp = require('gulp'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
	browserSync = require('browser-sync').create(),
	nodemon = require('gulp-nodemon'),
	sourcemaps = require('gulp-sourcemaps');

var inputPath = {
    'css': './public/src/css/*.css',
    'js': './public/src/js/*.js',
	'lib': './public/src/lib/*.js'
};

var outputPath = {
    'css': './public/dist/css/',
    'js': './public/dist/js/',
    'img': './public/dist/img/',
	'lib': './public/dist/lib/'
};

gulp.task('scripts', function () {
    gulp.src(inputPath.js)
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(concat('app.min.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.js))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});


gulp.task('styles', function () {
    gulp.src(inputPath.css)
		.pipe(sourcemaps.init())
			.pipe(autoprefixer())
			.pipe(concat('style.min.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.css))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('nodemon', function(cb) {
    nodemon({
            script: './app.js'
        })
        .on('start', function() {
            if (!called) {
                cb();
            }
            called = true;
        })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, 500);
        })
        .on('error', function(err) {
            // Make sure failure causes gulp to exit
            throw err;
        });
});

// Gulp watch changes
gulp.task('watch', function () {
    gulp.watch(inputPath.css, ['styles'], browserSync.reload);
    gulp.watch(inputPath.js, ['scripts'], browserSync.reload);
});

// Gulp default task
gulp.task('default', ['scripts', 'styles', 'watch']);
