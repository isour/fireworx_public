"use strict";

import { paths } from "../gulpfile.babel";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";

const webpackConfig = require("../webpack.config.js"),
    argv = yargs.argv,
    production =  process.env.NODE_ENV === 'production';

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

gulp.task("scripts", () => {
    return gulp.src("./app/scripts/app.js")
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(gulp.dest("./dist/assets/scripts/"))
        .pipe(debug({
            "title": "JS files"
        }))
        .on("end", browsersync.reload);

        // .pipe(webpackStream(webpackConfig), webpack)
        // .pipe(rename({
        //     suffix: ".min"
        // }))
        // // .pipe(gulpif(!isDebug, rename({
        // //     suffix: ".min"
        // // })))
        // .pipe(gulp.dest("./dist/assets/scripts/"))
        // // .pipe(debug({
        // //     "title": "JS files"
        // // }))
        // .on("end", browsersync.reload);
});