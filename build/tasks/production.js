'use strict';

const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const CacheBuster = require('gulp-cachebust');
const cachebust = new CacheBuster();

const uglify = require('gulp-uglify');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const vueify = require('vueify');
const buffer = require('vinyl-buffer');

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
        return gulp.src(config.stylesPaths)
            .pipe(postcss(plugins))
            .pipe(cssnano({ minifyFontValues: false, discardUnused: false }))
            .pipe(concat('app.css'))
            .pipe(cachebust.resources())
            .pipe(gulp.dest(config.DIST));
    });

	gulp.task('vendor', () => {
		return browserify(config.jsVendorEntryPointPaths)
			.transform(babelify)
			.bundle()
			.pipe(source('vendor.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(cachebust.resources())
			.pipe(gulp.dest(config.DIST));
	});

	gulp.task('app', () => {
		return browserify(config.jsAppEntryPointPaths)
			.transform(babelify)
			.transform(vueify)
			.bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			//.pipe(uglify())
			.pipe(cachebust.resources())
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
        gulp.parallel( 'vendor', 'app', 'assets') //'styles',
        ,'html'
    ];
};