import gulp from 'gulp';
import nano from 'gulp-cssnano';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const isDebug = process.env.NODE_ENV !== 'production';
process.env.AUTOPREFIXER_GRID = 'autoplace';

gulp.task("styles", () => {
	return gulp.src('app/styles/app.sss')
		// .on('data', function(){ log('STYLES START'); })
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(postcss())
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({extname: '.css', suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'));
});

// gulp.task('styles:lint', (done) => (
// 	gulp.src(['app/**/*.sss'])
// 		.pipe(stylint({
// 			reporter: 'postcss-reporter',
// 			reporterOptions: {verbose: true}
// 		}))
// 		.pipe(stylint.reporter())
// 		.pipe(stylint.reporter('fail', {failOnWarning: true})),
// 		done()
// ));
