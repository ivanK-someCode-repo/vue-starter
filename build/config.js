'use strict';

let src = './src/';

module.exports = {
	DIST: './public',
	SRC_BASE: src,
	allFiles: src + '**/*.*',
	allPublicFiles: '/public/**/*.*',
	indexHtmlPath: src + 'index.html',
	jsPaths: [src + '**/*.js'],
	jsVendorEntryPointPaths: [src + 'vendor-index.js'],
	jsAppEntryPointPaths: [src + 'app-index'],
	stylesPaths: [src + '**/*.pcss'],
	assetsPaths: [src + '**/*.{gif,ico,png,jpg,jpeg,woff,eot,ttf,svg}']
};