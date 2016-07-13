var gulp = require('gulp');
var minify = require('gulp-minifier');

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

gulp.task('default', ['minify']);
