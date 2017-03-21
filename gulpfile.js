const gulp = require('gulp')
const ghPages = require('gulp-gh-pages')

gulp.task('deploy', () => gulp.src(['./public/**/*', '!*.map', '!report.html'])
  .pipe(ghPages({
    force: true,
  })))
