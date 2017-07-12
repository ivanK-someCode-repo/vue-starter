'use strict';

const gulp = require('gulp');
const config = require('./build/config.js');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const browsersync = require('browser-sync').create();
//const packs = require('require-dir')('./build/tasks');
let  packs = [];
let tasks = [];

packs.push(require('./build/tasks/common.js'));
packs.push(isDevelopment ? require('./build/tasks/development.js') : require('./build/tasks/production.js'));

packs.forEach( (item, index) => {
	tasks = tasks.concat(item(gulp, config));
});

gulp.task('watch', function(){
    gulp.watch(config.allFiles, gulp.series(tasks));
});

gulp.task('serve', function(){
    browsersync.init({
        proxy: 'localhost:3000'
    });

    browsersync.watch(config.allPublicFiles).on('change', browsersync.reload);
});

//TODO: add incremental build (github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md)

gulp.task('default',
                    gulp.series(tasks,
                        gulp.parallel('watch', 'serve')));