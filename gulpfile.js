var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');

var webpackMarkCampaignsConfig = require('./app/webpack.mark.campaigns.config.js');
var webpackMarkCampaignsConfigDev = require('./app/webpack.mark.campaigns.config.dev.js');

var webpackMarkContactsConfig = require('./app/webpack.mark.contacts.config.js');
var webpackMarkContactsConfigDev = require('./app/webpack.mark.contacts.config.dev.js');

var webpackTransTemplatesConfig = require('./app/webpack.trans.templates.config.js');
var webpackTransTemplatesConfigDev = require('./app/webpack.trans.templates.config.dev.js');

//gulp.task('clean:build', function() {
    //del('..assets/js/dependencies/campaigns-bundle.js')
//})

// Code for marketing campaigns components..
gulp.task('markCampaigns', [], function() {
  return gulp.src('./app/marketing/campaigns-router.js')
    .pipe(webpack(webpackMarkCampaignsConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('markCampaignsDev', [], function() {
  return gulp.src('./app/marketing/campaigns-router.js')
    .pipe(webpack(webpackMarkCampaignsConfigDev))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('watch:markCampaignsDev', function() {
  return gulp.watch('./app/**/*', ['markCampaignsDev']);
});

// Code for marketing contacts components..
gulp.task('markContacts', [], function() {
  return gulp.src('./app/marketing/contacts-router.js')
    .pipe(webpack(webpackMarkContactsConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('markContactsDev', [], function() {
  return gulp.src('./app/marketing/contacts-router.js')
    .pipe(webpack(webpackMarkContactsConfigDev))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('watch:markContactsDev', function() {
  return gulp.watch('./app/**/*', ['markContactsDev']);
});

// Code for transectional components..
gulp.task('transTemplates', [], function() {
  return gulp.src('./app/transactional/templates-router.js')
    .pipe(webpack(webpackTransTemplatesConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('transTemplatesDev', [], function() {
  return gulp.src('./app/transactional/templates-router.js')
    .pipe(webpack(webpackTransTemplatesConfigDev))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('watch:transTemplatesDev', function() {
  return gulp.watch('./app/**/*', ['TransTemplatesDev']);
});


/**
 * Main tasks
 */

gulp.task('watch', ['markCampaignsDev', 'watch:markCampaignsDev']);
gulp.task('markCampaignsDev', ['markCampaignsDev']);
gulp.task('markCampaigns', ['markCampaigns']);

gulp.task('watch', ['markContactsDev', 'watch:markContactsDev']);
gulp.task('markContactsDev', ['markContactsDev']);
gulp.task('markContacts', ['markContacts']);

gulp.task('watch', ['transTemplatesDev', 'watch:transTemplatesDev']);
gulp.task('transTemplatesDev', ['transTemplatesDev']);
gulp.task('transTemplates', ['transTemplates']);


gulp.task('default', ['markCampaigns', 'markContacts', 'TransTemplates']);
