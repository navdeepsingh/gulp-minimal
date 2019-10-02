"use strict";

const { parallel, series, src, dest, watch, task } = require('gulp');
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();

var paths = {
  css: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: "sass/*.scss",
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "build/css"
  },
  images: {
    src: "images/*"
  },
  html: {
    src: "*.html"
  }
};

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function css() {
  return src(paths.css.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([cssnano()]))
    .pipe(dest(paths.css.dest))
    .pipe(browsersync.stream());
}

function html() {
  return src(paths.html.src)
    .pipe(browsersync.stream());
}

function refreshAssets() {
  browserSyncReload;
}

function watcher() {
  return watch([paths.css.src, paths.html.src], function(cb) {
      css();
      browsersync.reload();
      cb();
  });
}

exports.default = series(browserSync, css, watcher);
