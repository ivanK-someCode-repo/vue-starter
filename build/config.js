var src = './front/';
module.exports = {
  DIST: './public',
  SRC_BASE: src,
  allFiles: src + '**/*.*',
  indexHtmlPath: src + 'index.html',
  jsPaths: [src +'js/**/*.js'],
  jslibsPaths: [src + 'vendor/**/{vue,vue-router}.min.js'],
  stylesPaths: [src +'**/*.less'],
  assetsPaths: [src+'**/*.{gif,ico,png,jpg,jpeg,woff,eot,ttf,svg}']
};