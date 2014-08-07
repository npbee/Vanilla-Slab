var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');

gulp.task('scripts', function() {
  gulp.src('index.js')
  .pipe(browserify({
    standalone: 'vanillaSlab'
  }))
  .pipe(rename('vanilla-slab-text.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('lint', function() {
  return gulp.src('./index.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function() {
  return gulp.src('./test/test.js', {})
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('default', ['lint', 'scripts']);
