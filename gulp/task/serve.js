'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();


gulp.task('serve', serve);

function serve() {

    browserSync.init({
        server: {
            baseDir: ["./public","./"],
            index: "./public/index.html"
        }
    });
/*    gulp.src('./src/app/scss/!*.scss')
        .pipe(sourcemaps.init())
        .pipe(gsass().on('error', gutil.log))
        .pipe(sourcemaps.write('./maps'))
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/css'));*/
}
serve.description=`browser-sync init`;
