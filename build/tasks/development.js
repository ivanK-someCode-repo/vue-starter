'use strict';

const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
//const debug = require('gulp-debug');
//const path = require('path');
const uglify = require('gulp-uglify');
//const source = require('vinyl-source-stream');
const CacheBuster = require('gulp-cachebust');
const cachebust = new CacheBuster();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(gulp, config){

    //gulp.task('vendor-vue', function() {
    //    return gulp.src(config.jslibsPaths)
    //        .pipe(concat('vue.js'))
    //        .pipe(cachebust.resources())
    //        .pipe(gulp.dest(config.DIST));
    //});
	//
    //gulp.task('less', function() {
    //    return gulp.src(config.stylesPaths)
    //        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    //        .pipe(less())
    //        .pipe(concat('app.css'))
    //        .pipe(cachebust.resources())
    //        .pipe(cssnano())
    //        .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    //        .pipe(gulp.dest(config.DIST));
    //});
	//
    //gulp.task('js', function() {
    //    return gulp.src(config.jsPaths)
    //        //.pipe(gulpIf(isDevelopment, sourcemaps.init()))
    //        .pipe(concat('app.js'))
    //        .pipe(cachebust.resources())
    //        //.pipe(uglify())
    //        //.pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    //        .pipe(gulp.dest(config.DIST));
    //});
	//
    //gulp.task('assets', function(){
    //    return gulp.src(config.assetsPaths)
    //        .pipe(gulp.dest(config.DIST));
    //});
	//
    //gulp.task('html', function(){
    //    return gulp.src(config.indexHtmlPath)
    //        .pipe(cachebust.references())
    //        .pipe(gulp.dest(config.DIST));
    //});

    //gulp.task('watch', function(){
    //    gulp.watch(config.jsPaths, gulp.series('js','html'));
	//
    //    gulp.watch(config.stylesPaths, gulp.series('less','html'));
	//
    //    gulp.watch(config.assetsPaths, gulp.series('assets'));
	//
    //    gulp.watch(config.indexHtmlPath, gulp.series('html'));
    //});

    return [
        gulp.parallel('less', 'vendor-vue', 'js', 'assets')
        ,'html'
        //,'watch'
    ];

};