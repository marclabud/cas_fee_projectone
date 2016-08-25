'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');

gulp.task('hello', () => {
    return gutil.log("Hello Gulp");
});
