var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

var stylish = require('jshint-stylish');
//var mocha = require('gulp-mocha');
var karma = require('karma').server;

var karmaCommonConf = {
  browsers: ['Chrome', 'Safari'],
  frameworks: ['mocha', 'chai', 'chai-as-promised'],
  files: [
    'build/*.js',
    'test/test.js'
  ]
};

gulp.task('scripts', function() {
  gulp.src('./lib/index.js')
  .pipe(browserify({
    standalone: 'VanillaSlab'
  }))
  .pipe(rename('vanilla-slab.build.js'))
  .pipe(gulp.dest('./build'))
  .pipe(gulp.dest('./demo'));
});

gulp.task('lint', function() {
  return gulp.src('./lib/vanilla-slab.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('test', function(done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('default', ['lint', 'scripts']);
