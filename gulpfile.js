var gulp = require('gulp');
var baked = require('baked/gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

// Load and get the baked configuration
// in order to use srcDir and dstDir
var config = baked.init({options:{
  srcDir: "src"
}});

// This example uses its specific package.json file so its gulp instance seems
// to be distinct than the baked's one. This helper allows to load every tasks
// in the right gulp environment.
baked.defineTasks(gulp);

var paths = {
  stylus: {
    src: config.options.srcDir + '/**/*.styl',
    dst: config.options.dstDir
  }
};

// Get and render all .styl files recursively
gulp.task('stylus', function () {
  gulp.src(paths.stylus.src)
    .pipe(stylus())
    .pipe(gulp.dest(paths.stylus.dst));
});
// More informations on https://www.npmjs.org/package/gulp-stylus

gulp.task('assets', function () {
    gulp.src('./assets/**/*')
        .pipe(gulp.dest(config.options.dstDir));
});

gulp.task('watch:stylus', function () {
  gulp.watch(paths.stylus.src, ['stylus']);
});

// Defaults tasks
gulp.task('serve', ['assets', 'stylus', 'watch:stylus', 'baked:serve']);
gulp.task('default', ['assets', 'stylus', 'baked:default']);
