'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const htmlreplace = require('gulp-html-replace');

gulp.task('html',['vendor-bundle'], html);

function html() {
  /*  .html in component dirs and no java-script.html*/
    gulp.src(['./src/notedetail/*.html',
             './src/NoJavaScript.html'])
        .on('error', gutil.log)
        .pipe(htmlreplace({
            'vendor': '../vendors.min.js'
        }))
        .pipe(gulp.dest('./public/html'));
    /*  index.html*/
    gulp.src('./src/index.html')
        .on('error', gutil.log)
        .pipe(htmlreplace({
            'vendor': 'vendors.min.js'
        }))
        .pipe(gulp.dest('./public'));
}
html.description=`.HTML: from src to public`;
