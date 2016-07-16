var gulp = require('gulp');
var eslint = require('gulp-eslint');
var minify = require('gulp-minifier');
var serve = require('gulp-serve');

gulp.task('lint', function () {
    return gulp.src(['src/js/main.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('minify', function () {
	return gulp.src(['src/**/*']).pipe(minify({
	    minify: true,
	    collapseWhitespace: true,
	    conservativeCollapse: true,
	    minifyJS: true,
	    minifyCSS: true,
	    getKeptComment: function (content, filePath) {
	        var m = content.match(/\/\*![\s\S]*?\*\//img);
	        return m && m.join('\n') + '\n' || '';
	    }
	})).pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['minify']);
});

gulp.task('serve', serve('dist'));

gulp.task('dev', ['serve', 'watch']);
