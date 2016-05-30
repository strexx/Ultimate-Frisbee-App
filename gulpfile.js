var gulp = require('gulp'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var inputPath = {
    'css': './src/css/*.css',
    'js': './src/js/*.js',
	'lib': './src/lib/*.js',
	'templates': './src/templates/*.mst',
    'svg': './src/img/icons/svg/*.svg'
};

var outputPath = {
    'css': './dist/css/',
    'js': './dist/js/',
    'lib': './dist/lib/',
    'img': './dist/img/',
	'templates': './dist/templates/',
    'icons': './dist/img/icons/'
};

gulp.task('scripts', ['clean-scripts'], function () {
    gulp.src(inputPath.js)
        .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.js))
        .pipe(filesize())
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});


gulp.task('styles',['clean-styles'], function () {
    gulp.src(inputPath.css)
        .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(concat('style.min.css'))
            .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.css))
        .pipe(filesize())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('watch', function () {
    gulp.watch(inputPath.css, ['styles']);
    gulp.watch(inputPath.js, ['scripts']);
});


gulp.task('default', ['scripts', 'styles', 'watch']);
