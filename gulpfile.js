var runSequence = require('run-sequence');
var gulp        = require("gulp");
var clean       = require('gulp-clean');
var serve       = require('gulp-serve');
var sass        = require("gulp-sass");
var nunjucks    = require('gulp-nunjucks')
var request     = require("request");
var fs          = require('fs');
var config      = require('dotenv').config()


// what goes where?
var buildSrc = "src";
var buildDest = "dist";


// local webserver for development
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));


// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});
// Delete our old css files
gulp.task('clean-css', function () {
  return gulp.src(buildDest + "/css/**/*", {read: false})
    .pipe(clean());
});
// Delete our old js files
gulp.task('clean-js', function () {
  return gulp.src(buildDest + "/js/**/*", {read: false})
    .pipe(clean());
});


// Compile the templates into html
gulp.task("render", function () {
  gulp.src([buildSrc + '/pages/**/[!_]*.html'])
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(buildDest))
});


// Compile SCSS files to CSS
gulp.task("scss", ['clean-css'], function () {
  gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))
});


// simplest possible noddy js management
gulp.task("js", function () {
  gulp.src(buildSrc + "/js/**/*.js")
    .pipe(gulp.dest(buildDest + '/js'))
});



// Watch working folders for changes
gulp.task("watch", ["build"], function () {
  gulp.watch(buildSrc + "/scss/**/*", ["scss"]);
  gulp.watch(buildSrc + "/js/**/*", ["js"]);
  gulp.watch(buildSrc + "/pages/**/*", ["render"]);
  gulp.watch(buildSrc + "/entries.json", ["render"]);
});


// build the site
gulp.task("build", function(callback) {
  runSequence(
    "clean-build",
    ["render", "js", "scss"],
    callback
  );
});
