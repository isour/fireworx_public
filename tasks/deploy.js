import gulp from 'gulp';
import ghpages from 'gulp-gh-pages';

gulp.task('deploy', (done) => {
	return gulp.src(['dist/**/*', '!dist/robots.txt']).pipe(ghpages({branch: 'dist'})),
	done()
});
