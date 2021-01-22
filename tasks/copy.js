import gulp from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gulpIf from 'gulp-if';

const {INCLUDE_ROBOTS} = process.env;

gulp.task('copy', (done) => (
	gulp.src('app/resources/**/*')
		// .on('data', function(){ log('IMG START'); })
		.pipe(changed('dist'))
		.pipe(gulpIf(!INCLUDE_ROBOTS, filter(file => !/resources[\\\/]robots\.txt/.test(file.path))))
		.pipe(gulp.dest('dist'))
));
