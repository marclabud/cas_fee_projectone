'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');

gulp.task('html', html);

function html() {
  /*  .html in component dirs and no java-script.html*/
    gulp.src(['./src/notedetail/*.html',
             './src/NoJavaScript.html'])
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/html'));
    /*  index.html*/
    gulp.src('./src/index.html')
        .on('error', gutil.log)
        .pipe(gulp.dest('./public'));
}
html.description=`.HTML: from src to public`;
