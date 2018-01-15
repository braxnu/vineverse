const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')
const babel = require('gulp-babel')
const jsonfile = require('jsonfile')
const babelConfig = jsonfile.readFileSync('./.babelrc')
const named = require('vinyl-named')

function handleError (err) {
  console.log(err.message)
  console.log(err.stack)
  this.emit('end')
}

gulp.task('client', () => {
  return gulp.src([
    'src/client/index.js',
    'src/client/c3.js'
  ])
  .pipe(named())
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(gulp.dest('dist/assets'))
})

gulp.task('assets', () => {
  return gulp.src([
    'src/assets/**/*',
    'src/client/index.html',
    'src/client/c3.html'
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

gulp.task('default', gulp.parallel(
  'client',
  'assets',
  'server',
  done => done()
))

gulp.task('watch', () => gulp.watch(
  [
    'src/**/*.js',
    'src/**/*.html'
  ], gulp.parallel('default')
).on('error', handleError))
