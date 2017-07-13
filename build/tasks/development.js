'use strict';

const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();
const reload = browsersync.reload;

// const through2 = require('through2').obj;
// const path = require('path');
//const debug = require('gulp-debug');
//const path = require('path');
//const source = require('vinyl-source-stream');

const uglify = require('gulp-uglify');
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const vueify = require('vueify');
const buffer = require('vinyl-buffer');

const cached = require('gulp-cached');
const remember = require('gulp-remember');

const postcss = require('gulp-postcss');
const precss = require('precss');
const cssnext = require('postcss-cssnext');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssNested = require('postcss-nested');
const urlAdjuster = require('gulp-css-url-adjuster');

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
            .pipe(cached('styles'))
            .pipe(sourcemaps.init())
            .pipe(postcss(plugins))
            .pipe(remember('styles'))
            .pipe(concat('app.css'))
			.pipe(urlAdjuster({
				replace:  function(url){
					//console.log(url.split('/').slice(-1)[0]);
					return url.split('/').slice(-1)[0];
				},
			}))
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(config.DIST))

            .pipe(browsersync.stream());
    });

    gulp.task('vendor', () => {
        return browserify(config.jsVendorEntryPointPaths)
            .transform(babelify)
            .bundle()
            .pipe(source('vendor.js'))
            .pipe(gulp.dest(config.DIST));
    });

    gulp.task('app', () => {
        const b = watchify(browserify(config.jsAppEntryPointPaths, {debug: true}));

        function bundle(){
            return b
                .transform(babelify, {sourceMaps: true})
                .transform(vueify)
                .bundle()
                .pipe(source('app.js'))
                .pipe(buffer())
                //.pipe(sourcemaps.init())
                //.pipe(sourcemaps.write('maps'))
                .pipe(gulp.dest(config.DIST))
                //.pipe(reload({stream: true}));
        }

        b.on('update', bundle);

        return bundle();
    });

	gulp.task('assets', function(){
		return gulp.src(config.assetsPaths)
            .pipe(cached('assets'))
            .pipe(remember('assets'))
			.pipe(rename(function(filepath) {
				//console.log(filepath.dirname);
				return filepath.dirname = '';//path.join(filepath.dirname.split(path.sep)[0], 'assets');
			}))
			.pipe(gulp.dest(config.DIST))

            .pipe(browsersync.stream());
	});

    gulp.task('html', function(){
       return gulp.src(config.indexHtmlPath)
           .pipe(gulp.dest(config.DIST))
    });

    gulp.task('reload', function(cb){
        reload();
        cb();
    });

    gulp.task('watch', function(){
        gulp.watch(config.jsPaths, gulp.series('app', 'reload'));

        const stylesWatcher = gulp.watch(config.stylesPaths, gulp.series('styles'));

        stylesWatcher.on('change', function (event) {
            if (event.type === 'deleted') {                   // if a file is deleted, forget about it
                delete cached.caches.styles[event.path];       // gulp-cached remove api
                remember.forget('styles', event.path);         // gulp-remember remove api
            }
        });

        const assetsWatcher = gulp.watch(config.assetsPaths, gulp.series('assets'));

        assetsWatcher.on('change', function (event) {
            if (event.type === 'deleted') {
                delete cached.caches.styles[event.path];
                remember.forget('assets', event.path);
            }
        });

        gulp.watch(config.indexHtmlPath, gulp.series('html', 'reload'));
    });

// gulp.task('watch', function(){
//     gulp.watch(config.allFiles, gulp.series(tasks, 'reload'));
// });

    gulp.task('serve', function(){
        browsersync.init({
            server: {
                baseDir: './public'
            },
            port: 3005
            //proxy: 'localhost:3005'
        });
        //browsersync.watch(config.allPublicFiles).on('change', browsersync.reload);
    });

    return [
        gulp.parallel( 'styles', 'vendor', 'app', 'assets', 'html'),
        gulp.parallel('watch', 'serve')
    ];
};