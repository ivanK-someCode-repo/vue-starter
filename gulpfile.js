'use strict';

// const gulp = require('gulp');
// const config = require('./build/config.js');
// const packs = require('require-dir')('./build/tasks');
// const packsKeys = Object.keys(packs);
// let tasks = [];
//
// //const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
//
// for (let i=0; i < packsKeys.length; i++){
//     let packTasks = packs[packsKeys[i]](gulp, config);
//
//     for (let j=0; j < packTasks.length; j++){
//         tasks.push(packTasks[j]);
//     }
// }
//
// // gulp.task('watch', function(){
// //     gulp.watch(config.allFiles, gulp.series(tasks));
// // });
//
// gulp.task('default', gulp.series(tasks));

const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const vueify = require('vueify');
//const buffer = require('vinyl-buffer');

gulp.task('vendor', () => {
    return browserify(['src/vendor-index.js'])
        .transform(babelify)
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('./public'));
    //.pipe(buffer())     // You need this if you want to continue using the stream with other plugins
});

gulp.task('app', () => {
    return browserify(['src/app-index.js'])
        .transform(vueify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('../public'));
    //.pipe(buffer())     // You need this if you want to continue using the stream with other plugins
});