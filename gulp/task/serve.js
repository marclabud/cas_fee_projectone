'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();


gulp.task('serve',['clean:public','ts','sass','html','image','lib'], serve);

function serve() {

    browserSync.init({
        server: {
            baseDir: ["./public"]
        }
    });

    gulp.watch(['src/app/scss/*.scss','src/**/*.scss','!src/lib','!src/server'], ['sass']);
    gulp.watch(['src/**/*.ts','!src/lib','!src/server'], ['ts']);
    gulp.watch(['src/index.html','src/**/*.html','!src/lib','!src/server'], ['html']);
}
serve.description='public-setup, browser-sync and watch init';
