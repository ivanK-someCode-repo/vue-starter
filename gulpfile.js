'use strict';

const gulp = require('gulp');
const config = require('./build/config.js');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';
//const packs = require('require-dir')('./build/tasks');
let  packs = [];
let tasks = [];

packs.push(require('./build/tasks/common.js'));
packs.push(isDevelopment ? require('./build/tasks/dev.js') : require('./build/tasks/prod.js'));


console.log(packs);

packs.forEach( (item, index) => {
    console.log(item);

	console.log(item(gulp, config));

	tasks = tasks.concat(item(gulp, config));
});

console.log(tasks);

// gulp.task('watch', function(){
//     gulp.watch(config.allFiles, gulp.series(tasks));
// });

gulp.task('default', gulp.series(tasks));