'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const gts = require('gulp-typescript');
const tsProject = gts.createProject("tsconfig.json");

gulp.task('ts', tsc);

function tsc() {
    gutil.log("tsc aufruf");
    tsProject.src()
        .on('error', gutil.log)
        .pipe(gts(tsProject))
        .pipe(gulp.dest("./"));
}
tsc.description=`JS-Generierung mit Typescript (tsconfig.json)`;
