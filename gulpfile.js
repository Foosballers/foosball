var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    streamify = require('gulp-streamify');

var path = {
    HTML: 'src/index.html',
    ICON: 'src/favicon.ico',
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
    gulp.src(path.ICON)
        .pipe(gulp.dest(path.DEST));
    gulp.src('./node_modules/react-select/dist/default.css')
        .pipe(gulp.dest(path.DEST + '/css'));
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST + '/css'));
    gulp.src(path.JSLIBS)
        .pipe(uglify())
        .pipe(gulp.dest(path.DEST + '/js'));
    gulp.src(path.FONTS)
        .pipe(gulp.dest(path.DEST + '/fonts'));
});

gulp.task('watch', ['copy'], function() {
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

gulp.task('build-dev', ['copy'], function() {
    return browserify({
            entries: [path.ENTRY_POINT],
            transform: [reactify],
            debug: true,
        })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', ['copy'], function() {
    return browserify({
            entries: [path.ENTRY_POINT],
            transform: [reactify]
        })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('clean', function() {
    del.sync(path.DEST);
})

gulp.task('re-db', function() {
    require('./couch_views/database-recreate')
    require('./couch_views/game-inserter')
})