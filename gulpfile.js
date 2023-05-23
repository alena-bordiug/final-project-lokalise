let gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    cleanCSS    = require('gulp-clean-css');

// Compile sass into CSS & auto-inject into browsers

const sass = require('gulp-sass')(require('sass'));
gulp.task('sass', function() {
    return gulp.src("./scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
     return gulp.src('./css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css'));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/**/*.scss", gulp.series('sass', 'minify-css'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));

