let gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  gutil = require('gulp-util'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  nodemon = require('nodemon');

gulp.task('uglify', function () {
  gutil.log('Starting uglifyJS task.');
  gulp.src(['src/**/*.js'])
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('build/src'));

  gulp.src(['routes/**/*.js'])
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('build/routes'));

  gulp.src(['views/**/*.ejs'])
    .pipe(gulp.dest('build/views'));

  gulp.src(['bin/*'])
    .pipe(gulp.dest('build/bin'));

  gulp.src(['config.json'])
    .pipe(gulp.dest('build'));

  gulp.src(['app.js'])
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});


gulp.task('concat', function () {
  gutil.log('Starting concatJS task.');
  gulp.src('build/**/*.js')
    .pipe(concat('all_files_concated.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('jshint', function () {
  gutil.log('Starting jshint task.');
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function () {
  gutil.log('Starting watch task.');
  gulp.watch('src/**/*.js', function (event) {
    gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.start('jshint');
    gulp.start('uglify');
    gulp.start('concat');
  });
});

gulp.task('build:prod', function () {
  gutil.log('Starting build task.');
  gulp.start('uglify');
});

gulp.task('serve', function () {
  var callbackCalled = false;
  return nodemon({ script: './bin/www' }).on('start', function () {
    if (!callbackCalled) {
      callbackCalled = true;
      cb();
    }
  });
});

gulp.task('serve:prod', function () {
  var callbackCalled = false;
  return nodemon({ script: './build/bin/www' }).on('start', function () {
    if (!callbackCalled) {
      callbackCalled = true;
      cb();
    }
  });
});

gulp.task('default', function () {
  gutil.log('Gulp is working!');
  gulp.start('serve');
});
