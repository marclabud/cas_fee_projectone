'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');


gulp.task('clean:public', clean);

function clean() {
    // Synchrones Lösches um Konflikte zu vermeiden
    del.sync(['public/css/*',
         'public/html/*',
         'public/*']);
    gutil.log('dir public is cleaned');
}
clean.description=`del *.* from :build-dir public`;