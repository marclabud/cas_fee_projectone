'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');

gulp.task('build',['ts', 'sass','html','image'], build);

function build() {
    gutil.log('Build Tasks Done')
}
build.description=`Build: Target Dir is public`;
// build.flags= {'--dev':`Coming soon`};