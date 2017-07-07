let src = '../src/';

module.exports = {
  DIST: '../public',
  SRC_BASE: src,
  allFiles: src + '**/*.*',
  indexHtmlPath: src + 'index.html',
  jsPaths: [src +'**/*.js'],
  stylesPaths: [src +'**/*.pcss'],
  assetsPaths: [src+'**/*.{gif,ico,png,jpg,jpeg,woff,eot,ttf,svg}']
};