const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const header = require('gulp-header')
const pkg = require('./package.json')

rollup({
  entry: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}).then((bundle) => {
  return bundle.write({
    format: 'umd',
    moduleName: '$storage',
    dest: 'dist/storage.js'
  })
}).then(() => {
  let banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n')

  gulp.src('dist/storage.js')
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
})