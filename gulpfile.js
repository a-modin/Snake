var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	cssmin = require('gulp-cssmin'),
	htmlmin = require('gulp-minify-html'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	connect = require('gulp-connect');

// Минификация HTML
gulp.task('htmlmin', function() {
	var opts = {comments: false, spare: true};
	
	gulp.src('*.html')
	// .pipe(htmlmin(opts)) // Раскоментировать, если нужна минификация HTML
	.pipe(gulp.dest('./dist'))
	.pipe(connect.reload())
});

// Компиляция lESS в CSS, переименование и минификация
gulp.task('less', function(){
	gulp.src('less/*.less')
	.pipe(plumber())
	.pipe(concat('styles.css'))
	.pipe(less())
	.pipe(autoprefixer({
		browsers: ['last 3 versions']
	}))
	.pipe(gulp.dest('dist/css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload())
});

// Минификация и конкатинация и конкатенация JS
gulp.task('jsmin', function() {
	gulp.src('js/*.js')
	.pipe(plumber())
	.pipe(concat('app.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('less/*.less',['less']);
	gulp.watch('*.html',['htmlmin']);
	gulp.watch('js/*js',['jsmin']);
});

gulp.task('connect', function(){
	connect.server({
		port: 1337,
		livereload: true,
		root: 'dist'
	});
});


gulp.task('default', ['htmlmin', 'less', 'jsmin', 'watch', 'connect']);

