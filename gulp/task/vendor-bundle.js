'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const guglify = require('gulp-uglify');
const gconcat = require('gulp-concat');


gulp.task('vendor-bundle', vendorbundle);

function vendorbundle(){
    gulp.src([
        'node_modules/moment/moment.js',
        'node_modules/moment/locale/de',
        'node_modules/moment-timezone/builds/moment-timezone-with-data.js',
        'node_modules/systemjs/dist/system.js'
    ])
        .pipe(gconcat('vendors.min.js'))
        .pipe(guglify())
        .pipe(gulp.dest('./public'));
}

