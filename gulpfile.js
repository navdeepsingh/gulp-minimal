const { parallel, src, dest } = require('gulp');
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

var paths = {
  css: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: "sass/*.scss",
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "build/css"
  }
};

function css() {
  return src(paths.css.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([cssnano()]))
    .pipe(dest(paths.css.dest))
    .pipe(browserSync.stream());
}


//exports.build = parallel(css);
exports.default = parallel(css);