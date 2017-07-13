'use strict';

const gulp = require('gulp');
const config = require('./build/config.js');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
//const packs = require('require-dir')('./build/tasks');
let  packs = [];
let tasks = [];

packs.push(require('./build/tasks/common.js'));
packs.push(isDevelopment ? require('./build/tasks/development.js') : require('./build/tasks/production.js'));

packs.forEach( (item, index) => {
	tasks = tasks.concat(item(gulp, config));
});

gulp.task('default', gulp.series(tasks));