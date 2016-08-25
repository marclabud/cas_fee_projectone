'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const greeting = "Hello Gulp";

gulp.task('hello', hello);

function hello() {
    gutil.log(greeting)
}
hello.description=`Ausgabe von ${greeting}`;