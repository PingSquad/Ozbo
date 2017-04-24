var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

gulp.task('html', function(){
  return gulp.src('./views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./static'));
});

gulp.task('css', function(){
  return gulp.src('./sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
  gulp.watch('./sass/*.sass', ['css']);
  gulp.watch('./views/*.pug', ['pug']);
});

gulp.task('default', ['html', 'css']);
gulp.task('dev', ['html', 'css', 'watch']);
