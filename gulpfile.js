const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')
const strip = require('gulp-strip-comments')
const babel = require('gulp-babel')
const jsonfile = require('jsonfile')
const babelConfig = jsonfile.readFileSync('./.babelrc')

gulp.task('js', () => {
  return gulp.src([
    'src/client/index.js'
  ])
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(strip())
  .pipe(gulp.dest('dist/assets'))
})

gulp.task('assets', () => {
  return gulp.src([
    'src/assets/**/*',
    'src/client/index.html'
  ])
  .pipe(gulp.dest('dist/assets'))
})

gulp.task('server', () => {
  return gulp.src([
    'src/server/**/*.js',
    'src/shared/**/*.js'
  ], {
    base: 'src'
  })
  .pipe(babel(babelConfig))
  .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.parallel('js', 'assets', 'server', done => done()))

gulp.task('watch', () => {
  return gulp.watch(
    'src', gulp.parallel('default')
  ).on('error', function (err) {
    console.log(err.message)
    console.log(err.stack)
    this.emit('end')
  })
})
