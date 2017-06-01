var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.campaigns.config.js');
var webpackConfigDev = require('./webpack.campaigns.config.dev.js');

/**
 * Build (Webpack)
 */

//gulp.task('clean:build', function() {
    //del('..assets/js/dependencies/campaigns-bundle.js')
//})

gulp.task('build', [], function() {
  return gulp.src('./app/campaigns-router.js')
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('dev:build', [], function() {
  return gulp.src('./app/campaigns-router.js')
    .pipe(webpack(webpackConfigDev))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('watch:build', function() {
  return gulp.watch('./app/**/*', ['dev:build']);
});


/**
 * Main tasks
 */

gulp.task('watch', ['dev:build', 'watch:build']);
gulp.task('dev', ['dev:build']);
gulp.task('default', ['build']);
