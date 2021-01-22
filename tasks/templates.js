import gulp from 'gulp';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import gulpIf from 'gulp-if';
import prettify from 'gulp-jsbeautifier';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import pug from 'gulp-pug';
import inheritance from 'gulp-pug-inheritance';
import pugLinter from 'gulp-pug-linter';
import rename from 'gulp-rename';
import staticHash from 'gulp-static-hash';


function getData(pathToData) {
	var path = require('path');
	var fs   = require('fs');
	return function (dataFile) {
		var resolvedPath = path.resolve(pathToData);
		var dataPath = resolvedPath + path.sep;
		var dataFilePath = path.resolve(path.join(dataPath, /\.json$/.test(dataFile) && dataFile || dataFile + '.json'));

		if (dataPath !== dataFilePath.slice(0, dataPath.length)) {
			throw new Error('Data path is not in data directory. Abort due potential data disclosure.');
		}

		return JSON.parse(fs.readFileSync(dataFilePath));
	}
};


const data = {
	getData: getData('app/data'),
	jv0: 'javascript:void(0);',
	// dev-mode variable for using in jade
	__DEV__: process.env.NODE_ENV !== 'production'
};

gulp.task('clearCache', () => {
   return delete cached.caches['pug'];
});

gulp.task('templates', () => {
	return gulp.src('app/**/*.pug')
		.pipe(plumber({
			errorHandler: errorHandler(`Error in \'templates\' task`)
		}))
		.pipe(cached('pug'))
		.pipe(pugLinter({ reporter: 'puglint-stylish' }))
		.pipe(gulpIf(global.watch, inheritance({
				basedir: 'app',
				skip: 'node_modules'
			})))
		.pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(pug({
			basedir: 'app',
			pretty: true,
			locals : {
				resize_img : require("image-size"),
				urlF : require('url'),
				httpF : require('http'),
			},
			data
		}))
		.pipe(prettify({
			braceStyle: 'expand',
			indentWithTabs: true,
			indentInnerHtml: true,
			preserveNewlines: false,
			endWithNewline: true,
			wrapLineLength: 120,
			maxPreserveNewlines: 50,
			wrapAttributesIndentSize: 1,
			unformatted: ['use'],
			inline: false
		}))
		.pipe(gulpIf(process.env.NODE_ENV === 'production', staticHash({
			asset: 'dist',
			exts: ['js', 'css']
		})))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest('dist/html'));
});

gulp.task('templates:lint', () => {
	return gulp.src('app/{styles,blocks}/**/*.pug')
		.pipe(pugLinter({ reporter: 'puglint-stylish' }))
});
