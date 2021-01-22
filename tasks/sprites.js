import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith-multi';
import merge from 'merge-stream';
import path from 'path';
import errorHandler from 'gulp-plumber-error-handler';

const cwd = path.join(__dirname, '..');
const spritesDirPath = 'app/sprites';
const imgPath = '../images/sprites/';
const tmplName = 'spritesmith-sss-template.handlebars';
const tmplPath = '../app/conf';
const cssTemplate = path.join(__dirname, tmplPath, tmplName);

gulp.task('sprites', () => {
	const spriteData = gulp.src(['app/sprites/**/*.png', '!app/sprites/*.png'])
		.pipe(plumber({errorHandler: errorHandler(`Error in 'sprites' task`)}))
		.pipe(spritesmith({
			spritesmith(options) {
				options.imgPath = imgPath + options.imgName;
				options.retinaImgPath = imgPath + options.retinaImgName;
				options.cssName = options.cssName.replace(/\.css$/, '.sss');
				options.cssTemplate = cssTemplate;
				options.algorithm = 'binary-tree';
				options.padding = 8;
				return options;
			}
		}));

	const imgStream = spriteData.img.pipe(gulp.dest('dist/assets/images/sprites'));
	const styleStream = spriteData.css.pipe(gulp.dest('app/styles/sprites'));
	return merge(imgStream, styleStream);
});
