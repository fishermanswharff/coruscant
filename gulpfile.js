'use strict';

const path = require('path'),
  $ = require('gulp-load-plugins')(),
  AWS = require('aws-sdk'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync').create('chuck norris'),
  del = require('del'),
  fs = require('fs'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  historyApiFallback = require('connect-history-api-fallback'),
  install = require('gulp-install'),
  minifyHtml = require('gulp-minify-html'),
  sass = require('gulp-ruby-sass'),
  reload = browserSync.reload,
  rename = require('gulp-rename'),
  runSequence = require('run-sequence'),
  shell = require('gulp-shell'),
  Server = require('karma').Server,
  uglify = require('gulp-uglify'),
  webpack = require('gulp-webpack'),
  zip = require('gulp-zip');

const environment = $.util.env.type || 'development';
const isProduction = environment === 'production';
const webpackConfig = require('./webpack.config.js').getConfig(environment);
const port = $.util.env.port || 8080;
const paths = {
  dist: {
    root: `${__dirname}/dist`,
    js: `${__dirname}/dist/js`,
    css: `${__dirname}/dist/css`
  },
  source: {
    root: `${__dirname}/app`,
    js: [`${__dirname}/app/js/**/*.js`],
    css: [`${__dirname}/app/styles/**/*.scss`],
    html: [`${__dirname}/app/**/*.html`]
  },
  spec: {
    root: `${__dirname}/spec`,
    files: `${__dirname}/spec/**/*.spec.js`,
    support: `${__dirname}/spec/support`
  },
  tmp: [`${__dirname}/.module-cache`,`${__dirname}/.sass-cache`,`${__dirname}/.tmp`]
}

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('serve',['clean','minify-html','sass','scripts','watch'], function() {
  browserSync.init({
    server: {
      baseDir: paths.dist.root,
      index: 'index.html',
      middleware: [ historyApiFallback() ],
    },
    port: port,
    ui: {
      port: 8081
    },
  });
  gulp.watch([paths.source.html, paths.source.css, paths.source.js], {cwd: 'app/build'}, reload);
});

gulp.task('clean', function() {
  return del(paths.tmp).then(function (deleted) {
    console.log('Deleted files/folders:\n', deleted.join('\n'));
  });
});

gulp.task('scripts', function(){
  return gulp.src(webpackConfig.entry)
    .on('error', function(error) {
      console.log('ERROR: ' + error.toString());
      this.emit("end");
    })
    .pipe($.webpack(webpackConfig))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(reload({ stream:true }));
});

gulp.task('minify-html', function () {
  return gulp.src(paths.source.html)
    .pipe(minifyHtml())
    .pipe(gulp.dest(paths.dist.root));
});

gulp.task('sass', function() {
  return sass(paths.source.css)
    .pipe(gulp.dest(paths.dist.css))
    .pipe(reload({ stream:true }));
});

gulp.task('watch', function() {
  gulp.watch(paths.source.js, ['scripts']);
  gulp.watch(paths.source.css, ['sass']);
  gulp.watch(paths.source.html, ['minify-html']);
  gulp.watch(paths.spec.files, ['test']);
});

gulp.task('default', ['scripts', 'sass', 'minify-html']);
