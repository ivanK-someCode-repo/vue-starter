'use strict';

const del = require('del');

module.exports = function(gulp, config){

  gulp.task('clean', function() {
    return del([config.DIST]);
  });

  return [
    'clean'
  ];
};