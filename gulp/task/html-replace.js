'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const htmlreplace = require('gulp-html-replace');

gulp.task('html-replace',['vendor-bundle'], function() {
    gulp.src(['index.html',
        'html/notedetail.html']
    )
        .pipe(htmlreplace({
            'vendor': 'vendors.min.js'
        }))
        .pipe(gulp.dest('./public/html'));
});
