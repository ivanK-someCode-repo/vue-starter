'use strict';

const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
//const debug = require('gulp-debug');
//const path = require('path');
const uglify = require('gulp-uglify');
//const source = require('vinyl-source-stream');
const CacheBuster = require('gulp-cachebust');
const cachebust = new CacheBuster();

const postcss = require('gulp-postcss');
const precss = require('precss');
const cssnext = require('postcss-cssnext');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssNested = require('postcss-nested');

module.exports = function(gulp, config){

    gulp.task('styles', function() {
        const plugins = [
            cssnext({browsers: ['> 1%'], cascade: false}),
            precss(),
            postcssMixins(),
            postcssSimpleVars(),
            postcssNested()
        ];
        return gulp.src(config.stylesPath)
            .pipe(sourcemaps.init())
            .pipe(postcss(plugins))
            .pipe(concat('app.css'))
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(config.DIST));
    });

    gulp.task('vendor', function() {
        return gulp.src(config.jslibsPaths)
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest(config.DIST));
    });

    gulp.task('js', function() {
       return gulp.src(config.jsPaths)
           .pipe(sourcemaps.init())
           .pipe(concat('app.js'))
           .pipe(sourcemaps.write('.'))
           .pipe(gulp.dest(config.DIST));
    });

    gulp.task('assets', function(){
       return gulp.src(config.assetsPaths)
           .pipe(gulp.dest(config.DIST));
    });

    gulp.task('html', function(){
       return gulp.src(config.indexHtmlPath)
           .pipe(gulp.dest(config.DIST));
    });

    gulp.task('watch', function(){
       gulp.watch(config.jsPaths, gulp.series('js','html'));

       gulp.watch(config.stylesPaths, gulp.series('less','html'));

       gulp.watch(config.assetsPaths, gulp.series('assets'));

       gulp.watch(config.indexHtmlPath, gulp.series('html'));
    });

    return [
        gulp.parallel('styles', 'vendor', 'js', 'assets')
        ,'html'
        //,'watch'
    ];

};