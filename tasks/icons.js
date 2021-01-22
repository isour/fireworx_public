import gulp from 'gulp';
import clean from 'gulp-clean';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import rename from 'gulp-rename';
import svgSymbols from 'gulp-svg-symbols';
import svgmin from 'gulp-svgmin';
import path from 'path';

gulp.task('icons:clean', () => {
	return gulp.src('app/icons/optimized/**/*.svg', {read: false})
		.pipe(clean());
});

gulp.task('icons:optimize', () => {
	return gulp.src('app/icons/source/**/*.svg')
		.pipe(svgmin(function getOptions (file) {
			let prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [
					{
						removeViewBox: false
					},
					{
						sortDefsChildren: false
					},
					{
						removeUselessDefs: false
					},
					{
						cleanupIDs: {
							prefix: prefix + ''
						}
					}
				]
			}
		}))
        .pipe(gulp.dest('app/icons/optimized/'));
});

gulp.task('icons:sprite', () => {
	return gulp.src('app/icons/optimized/**/*.svg')
		.pipe(plumber({errorHandler: errorHandler(`Error in 'icons' task`)}))
		.pipe(svgSymbols({
			title: false,
			id: 'icon_%f',
			class: 'icon_%f',
			templates: [
				path.join('app/conf/svg-size.sss'),
				'default-svg'
			]
		}))
		.pipe(gulpIf(/\.sss$/, gulp.dest('app/styles/icons')))
		.pipe(gulpIf(/\.svg$/, rename('icon.svg')))
		.pipe(gulpIf(/\.svg$/, gulp.dest('dist/assets/images/')));
});

gulp.task('icons', gulp.series("icons:clean", "icons:optimize", "icons:sprite"));
