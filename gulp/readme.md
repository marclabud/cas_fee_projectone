# Building with Gulp

## Install

gulp-cli is needed:

    npm install --global gulp-cli

gulp  --version is

    CLI version 1.2.2
    Local version 3.9.1


gulp -T for tasklist

## Simple Task example hello.js

```javascript    
    'use strict';
    const gulp = require('gulp');
    const gutil = require('gulp-util');
    const greeting = "Hello Gulp";
    gulp.task('hello', hello);

    function hello() {
    gutil.log(greeting)
    }
    hello.description=`Ausgabe von ${greeting}`;
```    

uses es6 const, template string

description is shown in gulp -T

gulp-util for logging

## target dir
Target Dir for frontend build is public.

    public
      I-css
         I-image
      I-html
    index.html
    app.js     

start with index.html.

## tasklist
- [ ] linter for ts and scss
- [ ] webpack for js bundling
- [ ] define modes for dev, test, prod
