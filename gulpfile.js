'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = require('./build/config.js');
const packs = require('require-dir')('./build/tasks');
const packsKeys = Object.keys(packs);
let tasks = [];

for (let i=0; i < packsKeys.length; i++){
    let packTasks = packs[packsKeys[i]](gulp, config);

    for (let j=0; j < packTasks.length; j++){
        tasks.push(packTasks[j]);
    }
}

gulp.task('watch', function(){
    gulp.watch(config.allFiles, gulp.series(tasks));
});

gulp.task('server', function() {
    nodemon({
        script: 'start'
        ,watch: ['start', './back/**/*.*']
        //ext: 'js html',
        //,tasks: ['watch']
        ,env: { 'NODE_ENV': 'development' }
    }).on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', () => {
            console.log('server has been restarted');
            //gulp.src('./server.js')
            //	.pipe(notify('Running the start tasks'));
        });
});

tasks.push('server');

gulp.task('default', gulp.series(tasks));