import { get as browserSync } from 'browser-sync';
import gulp from 'gulp';
import watch from 'gulp-watch';

const bs = browserSync('server');

gulp.task('watch', () => {
	global.watch = true;

	watch(['app/sprites/**/*.png', '!app/sprites/*.png'], gulp.parallel('sprites'));
	watch('app/{styles,blocks}/**/*.sss', gulp.parallel('styles'));
	watch(['app/{pages,blocks}/**/*.pug'], gulp.parallel('templates'));
	watch('app/scripts/**/*.js', gulp.parallel('scripts'));
	watch(['app/data/**/*.json'], gulp.parallel('clearCache', 'templates'));
	watch('app/resources/**/*', gulp.parallel('copy'));
	watch('app/icons/source/**/*.svg', gulp.parallel('icons'));
});
