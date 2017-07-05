import gulp from 'gulp';
import del from 'del';
/*
 * For small tasks you can use arrow functions and export
 */
const clean = () => del(['assets']);
export { clean };

gulp.task('default', clean);