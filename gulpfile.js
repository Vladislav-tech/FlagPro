const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/'},
    online: true,
    notify: false,
  });
}

function styles() {
  return src('app/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(concat('style.min.css'))
  .pipe(sass())
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(cleancss( { level: { 1: { specialComments: 0 } }} ))
  .pipe(sourcemaps.write())
  .pipe(dest('app/css/'))
  .pipe(browserSync.stream());
}

function scripts() {
  return src([
    'app/js/script.js',
    'app/js/ripple.js',
    'app/js/contriesArray.js',
    'app/js/particles.min.js',
    'app/js/gradientHover.js',
    'app/js/smoothAppearance.js',
    'app/js/scrollIndicator.js',
    'app/js/tabs.js',
    'app/js/quiz.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream());
}

function images() {
  return src('app/img/src/**/*')
  .pipe(newer('app/img/dist'))
  .pipe(imagemin())
  .pipe(dest('app/img/dist/'));
}

function startwatch() {
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  watch('app/scss/*.scss', styles);
  watch('app/**/*.html').on('change', browserSync.reload);
  watch('app/img/src/**/*', images);
}

function buildCopy() {
  return src([
    'app/**/*.min.js',
    'app/css/**/*.min.css',
    'app/img/dist/**/*',
    'app/**/*.html',
  ], { base: 'app'} )
  .pipe(dest('dist'));
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.buildCopy = buildCopy;
exports.build = series(styles, scripts, images, buildCopy);

exports.default = parallel(styles, scripts, images, buildCopy, browsersync, startwatch);
