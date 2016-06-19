/*--------------------------------------------------------------
	Gulp requirements + paths
--------------------------------------------------------------*/
var gulp = require('gulp'),
	clean = require('gulp-clean'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	critical = require('critical'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
	copy = require('gulp-copy'),
	filesize = require('gulp-filesize'),
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


/*--------------------------------------------------------------
	Default Gulp tasks [add return before src to async tasks]
--------------------------------------------------------------*/
// Gulp default task
gulp.task('default', ['clean-scripts', 'clean-styles', 'clean-lib', 'scripts', 'styles', 'copy-lib']);

// JS scripts task
gulp.task('scripts', function () {
    return gulp.src(inputPath.js)
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(concat('app.min.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.js))
});

// CSS styles task
gulp.task('styles', function () {
    return gulp.src(inputPath.css)
		.pipe(sourcemaps.init())
			.pipe(autoprefixer())
			.pipe(concat('style.min.css'))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.css))
});

// CLEAN
gulp.task('clean-scripts', function () {
  gulp.src(outputPath.js, {read: false})
    .pipe(clean());
});

gulp.task('clean-styles', function () {
  gulp.src(outputPath.css, {read: false})
    .pipe(clean());
});

gulp.task('clean-lib', function () {
  gulp.src(outputPath.lib, {read: false})
    .pipe(clean());
});

// Copy files task
gulp.task('copy-lib', function () {
	gulp.src([inputPath.lib])
        .pipe(gulp.dest((outputPath.lib)));
});

// Watch file changes
gulp.task('watch', function () {
    gulp.watch(inputPath.css, ['styles']);
    gulp.watch(inputPath.js, ['scripts']);
});


/*--------------------------------------------------------------
	Optional Gulp tasks
--------------------------------------------------------------*/
// Critical CSS
gulp.task('critical', function (cb) { //src: http://fourkitchens.com/blog/article/use-gulp-automate-your-critical-path-css
    critical.generate({
        base: './',
        src: './public/index.html',
        css: ['./public/dist/css/style.min.css'],
        dimensions: [{
            width: 320,
            height: 480
    }, {
            width: 768,
            height: 1024
    }, {
            width: 1280,
            height: 960
    }],
        dest: './public/dist/css/critical.css',
        minify: true,
        extract: false
        //ignore: ['font-face']
    });
});
