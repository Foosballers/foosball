var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    browserSync = require('browser-sync'),
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
    OUT: 'js/build.js',
    DEST: 'public',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'public',
    ENTRY_POINT: './src/js/App.jsx'
};

gulp.task('copy', function() {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST + '/css'));
    gulp.src(path.JSLIBS)
        .pipe(gulp.dest(path.DEST + '/js'));
    gulp.src(path.FONTS)
        .pipe(gulp.dest(path.DEST + '/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(path.HTML, ['copy']);

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    browserSync({
        proxy: 'http://localhost:5000',
        files: [path.DEST + '/**/*.*']
    });

    return watcher.on('update', function() {
            watcher.bundle()
                .pipe(source(path.OUT))
                .pipe(gulp.dest(path.DEST_SRC))
            console.log('Updated', Date.now());
        })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));

});

gulp.task('build',['copy'], function() {
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('replaceHTML', function() {
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));
});