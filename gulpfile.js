var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    streamify = require('gulp-streamify');

var path = {
    HTML: 'src/index.html',
    CSS: 'src/css/*.css',
    FONTS: 'src/fonts/**/**.*',
    JSLIBS: 'src/js-lib/**/*.js',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'public',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'public',
    ENTRY_POINT: './src/js/App.js'
};

gulp.task('copy', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST + '/css'));
    gulp.src(path.JSLIBS)
        .pipe(gulp.dest(path.DEST + '/js'));
    gulp.src(path.FONTS)
        .pipe(gulp.dest(path.DEST + '/fonts'));
});