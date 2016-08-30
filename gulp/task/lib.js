'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');

gulp.task('lib', lib);

function lib() {
    gulp.src('./src/lib/**')
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/lib'));

}
lib .description=`all libs: copy from src to public`;