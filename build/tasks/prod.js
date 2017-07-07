'use strict';

const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const CacheBuster = require('gulp-cachebust');
const cachebust = new CacheBuster();

const postcss = require('gulp-postcss');
const precss = require('precss');
const cssnext = require('postcss-cssnext');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssNested = require('postcss-nested');

module.exports = function(gulp, config){

    gulp.task('vendor', function() {
        return gulp.src(config.jslibsPaths)
            .pipe(concat('vendor.js'))
            .pipe(cachebust.resources())
            .pipe(gulp.dest(config.DIST));
    });

    gulp.task('styles', function() {
        const plugins = [
            cssnext({browsers: ['> 1%'], cascade: false}),
            precss(),
            postcssMixins(),
            postcssSimpleVars(),
            postcssNested()
        ];
        return gulp.src(config.stylesPath)
            .pipe(postcss(plugins))
            .pipe(cssnano({ minifyFontValues: false, discardUnused: false }))
            .pipe(concat('app.css'))
            .pipe(cachebust.resources())
            .pipe(gulp.dest(config.DIST));
    });

    gulp.task('js', function() {
       return gulp.src(config.jsPaths)
           .pipe(concat('app.js'))
           .pipe(cachebust.resources())
           .pipe(uglify())
           .pipe(gulp.dest(config.DIST));
    });

    gulp.task('assets', function(){
       return gulp.src(config.assetsPaths)
           .pipe(gulp.dest(config.DIST));
    });

    gulp.task('html', function(){
       return gulp.src(config.indexHtmlPath)
           .pipe(cachebust.references())
           .pipe(gulp.dest(config.DIST));
    });

    return [
        gulp.parallel('styles', 'vendor', 'js', 'assets')
        ,'html'
    ];

};