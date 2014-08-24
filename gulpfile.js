var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var stylish = require('jshint-stylish');
//var mocha = require('gulp-mocha');
var karma = require('karma').server;

var webserver = require('gulp-webserver');

var karmaCommonConf = {
  browsers: ['Chrome', 'Safari', 'Firefox'],
  frameworks: ['mocha', 'chai', 'chai-as-promised'],
  singleRun: true,
  files: [
    'build/*.js',
    'test/test.js'
  ]
};

var karmaCommonConf_ci = {
  browsers: ['PhantomJS'],
  frameworks: ['mocha', 'chai', 'chai-as-promised'],
  singleRun: true,
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

gulp.task('uglify', function() {
  gulp.src('build/vanilla-slab.build.js')
  .pipe(uglify({
   }))
  .pipe(rename('vanilla-slab.build.min.js'))
  .pipe(gulp.dest('./build'))
  .pipe(gulp.dest('./demo'));
});

gulp.task('test', function(done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('test_ci', function(done) {
  karma.start(karmaCommonConf_ci, done);
});

gulp.task('serve', function() {
  gulp.src('demo')
  .pipe(webserver({
  }));
});


gulp.task('default', ['lint', 'scripts']);
gulp.task('build', ['lint', 'scripts', 'uglify']);
