const gulp = require("gulp4");
const pug = require("gulp-pug");
const babel = require("gulp-babel");
const less = require("gulp-less");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");

function styles() {
    return gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("public/styles"));
}

function scripts() {
    return gulp.src("src/scripts/*.js")
        .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("public/scripts"));
}

function pages() {
    return gulp.src("src/pug/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("public/html"));
}

gulp.task("default", gulp.series(styles, scripts));