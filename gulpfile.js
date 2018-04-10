const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('scripts', function(){
	gulp.src('src/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
	    .pipe(gulp.dest('dist'));
	gulp.src('src/*.css')
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);