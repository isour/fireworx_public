import gulp from 'gulp';
import bump from 'gulp-bump';

const dest = gulp.dest('./');

gulp.task('patch', () => {
	return gulp.src('package.json')
		.pipe(bump())
		.pipe(dest);
});

gulp.task('minor', () => {
	return gulp.src('package.json')
		.pipe(bump({type: 'minor'}))
		.pipe(dest)
});

gulp.task('major', () => {
	return gulp.src('package.json')
		.pipe(bump({type: 'major'}))
		.pipe(dest);
});

gulp.task('semver:reset', () => {
	return gulp.src('package.json')
		.pipe(bump({version: '0.1.0'}))
		.pipe(dest)
});
