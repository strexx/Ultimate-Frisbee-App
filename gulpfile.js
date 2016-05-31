var gulp = require('gulp'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

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
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
        .pipe(gulp.dest(outputPath.js))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});


gulp.task('styles', function () {
    gulp.src(inputPath.css)
            .pipe(autoprefixer())
            .pipe(concat('style.min.css'))
            .pipe(cssnano())
        .pipe(gulp.dest(outputPath.css))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('watch', function () {
    gulp.watch(inputPath.css, ['styles']);
    gulp.watch(inputPath.js, ['scripts']);
});


gulp.task('default', ['scripts', 'styles', 'watch']);
