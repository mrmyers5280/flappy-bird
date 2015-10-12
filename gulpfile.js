var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');

// JavaScript linting task
gulp.task('jshint', function() {
	return gulp.src('site/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
	return gulp.src('site/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/css'))
		.pipe(connect.reload());
});

// Minify index
gulp.task('html', function() {
	return gulp.src('site/index.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
	return gulp.src('site/js/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(connect.reload());
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
	return gulp.src('site/css/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
	return gulp.src('site/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/images'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'build',
		livereload: true
	});
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('site/js/*.js', ['jshint', 'scripts']);
	gulp.watch('site/scss/*.scss', ['sass']);
	gulp.watch('site/index.html', ['html']);
	console.log('Gulp is running...');
});

// Default task
gulp.task('default', ['jshint', 'scripts', 'sass', 'connect', 'watch']);

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);
