// -------------------------------------------------------------------
// :: GULP SERVER
// -------------------------------------------------------------------
// - https://www.npmjs.org/package/gulp-watch
// - https://www.npmjs.org/package/gulp-plumber
// - https://www.npmjs.com/package/browser-sync
// - https://www.npmjs.org/package/run-sequence

var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var run = require('run-sequence');

gulp.task('server', function(callback) {

    return run('clean', ['icon-font', 'sass', 'render-templates', 'sass-lint'], function () {
        browserSync.init({
          notify: false,
          port: 9000,
          server: {
            baseDir: ['.tmp', 'src'],
            routes: {
              '/bower_components': 'bower_components'
            }
          }
        });
        gulp.watch('src/icons/*.*', ['icon-font']);
        gulp.watch('src/styles/**/*.scss', ['sass', 'sass-lint']);
        gulp.watch('src/**/*.njk', ['render-templates']);
        gulp.watch([
            '.tmp/**/*.css',
            '.tmp/**/*.html'
        ]).on('change', browserSync.reload);

        callback();
    });

});


/**
 * Check the distribution build
 */

gulp.task('server:dist', ['build'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});
