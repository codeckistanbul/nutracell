'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gsass = require('gulp-sass');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const twig = require('gulp-twig');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const header = require('gulp-header');
const imagemin = require('gulp-imagemin');
const data = require('gulp-data');
const htmlmin = require('gulp-htmlmin');
const foreach = require('gulp-foreach');

const templates = './src/templates/';
const dist = './dist/';
const homePath = './src/assets/';
const nodeModules = './node_modules/';



const paths = {
    js: 'assets/js/',
    css: 'assets/css/'
};

const sourceJs = [
    nodeModules + 'jquery/dist/jquery.js',
    nodeModules + 'bootstrap/dist/js/bootstrap.js',
    nodeModules + 'slick-carousel/slick/slick.js',
    nodeModules + 'wowjs/dist/wow.min.js',
    homePath + 'js/main.js',
];

const sourceSass = [
    homePath + "css/style.sass"
];



function compile() {
    const dataSource = require('./data.json');
    return gulp.src('./src/templates/pages/*.html')
        .pipe(data(dataSource))
        .pipe(foreach(function (stream, file) {
            return stream
                .pipe(twig({base: './src/templates'}))
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
}


function scripts() {
    return gulp.src(sourceJs)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist + 'assets/js'))
        .pipe(connect.reload());
}


function scriptsDev() {
    return gulp.src(sourceJs)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(dist + 'assets/js'))
        .pipe(connect.reload())
}


function connectGulp() {
    connect.server({
        root: [dist],
        livereload: true
    });
}

function clean() {
    return del([dist + '**', '!' + dist])
}

function copyFiles() {
    return gulp
        .src(['./src/assets/img/**/*', './src/assets/icons/**/*', './src/assets/fonts/**/*', './src/assets/animations/**/*'
        ], {base: './src/'})
        .pipe(gulp.dest(dist))
}

function style() {
    const plugins = [
        autoprefixer(),
        cssnano({discardComments: true})
    ];
    return gulp.src(sourceSass)
        .pipe(sourcemaps.init({}))
        .pipe(gsass({
            includePaths: ['node_modules']
        }).on('error', gsass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.', {addComment: false}))
        .pipe(gulp.dest(dist + 'assets/css'))
        .pipe(connect.reload());
}


function myWatchTasks() {
    gulp.watch(['./src/assets/css/*.sass'], style);
    gulp.watch(['./src/assets/js/*.js'], scriptsDev);
    gulp.watch(['./src/templates/**/*.html'], compile);
}

const dev = gulp.parallel(gulp.series(clean, style, copyFiles, scriptsDev, compile, connectGulp), myWatchTasks);
const build = gulp.series(clean, style, copyFiles, scripts, compile);


exports.clean = clean;
exports.copyFiles = copyFiles;
exports.compile = compile;
exports.build = build;
exports.default = dev;
exports.dev = dev;
exports.style = style;
