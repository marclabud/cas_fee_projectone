'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');

gulp.task('build',['ts', 'sass','html'], build);

function build() {
    gutil.log('Build Tasks Done')
}
build.description=`Build Stand Release 1.0 tsc und sass`;
build.flags= {'--dev':`Coming soon`};