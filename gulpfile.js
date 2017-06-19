var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

// Скрипты проекта
gulp.task('scripts', function() {
	return gulp.src([
		// 'layout/libs/jquery/dist/jquery.min.js',
		// 'layout/libs/az-select/az-select.js',
		// 'layout/libs/bootstrap/bootstrap.min.js',
		// 'layout/libs/owl.carousel/owl.carousel.min.js',
		// 'layout/libs/mmenu/jquery.mmenu.min.all.js',
		// 'layout/libs/superfish-master/dist/js/superfish.min.js',
		// 'layout/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		// 'layout/libs/jquery.jcarousellite/jquery.jcarousellite.min.js',
		'layout/js/common.js', // Всегда в конце
		'layout/js/common2.js', // Всегда в конце
		])
	.pipe(concat('scripts.js'))
	// .pipe(uglify('scripts.min.js'))
	.pipe(gulp.dest('layout/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('min-scripts', function() {
	return gulp.src('layout/js/scripts.js')
	.pipe(uglify())
	.pipe(rename('scripts.min.js'))
	.pipe(gulp.dest('layout/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		proxy: "virtualdc.loc",
		// server: {
		// 	baseDir: 'layout'
		// },
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('layout/sass/**/*.scss')
	.pipe(sass({
		includePaths: bourbon.includePaths
	}).on("error", notify.onError()))
	.pipe(rename({suffix: '', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS())
	.pipe(gulp.dest('layout/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('min-css', function() {
	return gulp.src('layout/css/main.css')
	.pipe(rename("main.min.css"))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('layout/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'min-css', 'scripts', 'min-scripts', 'browser-sync'], function() {
	gulp.watch('layout/sass/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'layout/js/common.js', 'layout/js/common2.js'], ['scripts']);
	gulp.watch('layout/*.html', browserSync.reload);
	gulp.watch('layout/**/*.php', browserSync.reload);
	gulp.watch('layout/css/main.css', ['min-css']);
	gulp.watch('layout/js/scripts.js', ['min-scripts']);

});

gulp.task('imagemin', function() {
	return gulp.src('layout/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function() {

	var buildFiles = gulp.src([
		'layout/*.html',
		'layout/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'layout/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'layout/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'layout/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
