'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');

// clean:public has to be first element and defined synchron
gulp.task('build',['clean:public','ts','sass','html','image','lib',], build);

function build() {
    gutil.log('Build Tasks Done');
}
build.description=`Build: Target Dir is public`;
// build.flags= {'--dev':`Coming soon`};