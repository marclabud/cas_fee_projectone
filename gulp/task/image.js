'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const gflatten = require('gulp-flatten');

gulp.task('image', image);

function image() {
    /*   All .png, .svg in component dirs*/
    gulp.src(['./src/**/*.png','./src/**/*.svg'])
        .on('error', gutil.log)
        .pipe(gflatten())
        .pipe(gulp.dest('./public/css/image'));

}
image.description=`All images (.svg, .png):copy from src to public`;