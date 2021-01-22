import gulp from 'gulp';
require('require-dir')('./');

gulp.task('styles:dependencies', gulp.parallel("sprites", "icons", "styles"));

gulp.task('default', gulp.parallel("styles:dependencies", "copy", "templates", "server", "watch", "scripts"));

gulp.task('build', gulp.series("copy", gulp.parallel("styles:dependencies", "scripts", "templates")));
