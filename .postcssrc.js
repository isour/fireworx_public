module.exports = {
	"parser": "sugarss",
	"plugins": {
		"stylelint": {},
		"postcss-easy-import": {
			"extensions": [
				".sss"
			]
		},
		"postcss-mixins": {},
		"postcss-normalize": {},
		"postcss-color-function": {},
		"postcss-animation": {},
		"postcss-pxtorem": {},
		"lost": {},
		"postcss-momentum-scrolling": {},
		"postcss-flexbugs-fixes": {},
		"postcss-object-fit-images": {},
		"precss": {},
		"postcss-each": {},
		"postcss-sort-media-queries": {},
		"postcss-assets": {
			"loadPaths": [
				"assets/images/",
				"dist/assets/images/"
			],
			"basePath": "dist/",
			"relative": "assets/css/"
		},
		"autoprefixer": {
			grid: true
		},
		"postcss-reporter": {
			"clearReportedMessages": true
		}
	}
}