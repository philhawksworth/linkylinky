var runSequence = require('run-sequence');
var gulp        = require("gulp");
var clean       = require('gulp-clean');
var serve       = require('gulp-serve');
var sass        = require("gulp-sass");
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
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync(buildSrc + '/entries.json'));
    }))
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



// build the site
gulp.task("build", function(callback) {
  runSequence(
    "clean-build",
    "html",
    "js",
    callback
  );
});
