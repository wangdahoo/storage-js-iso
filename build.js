const rollup = require('rollup').rollup
const babel = require('rollup-plugin-babel')
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

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
  gulp.src('dist/storage.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
})