const project_folder = 'dist',
    source_folder = '#src',
    path = {
        build: {
            html: project_folder + '/',
            css: project_folder + '/css/',
            js: project_folder + '/js/',
            img: project_folder + '/img/',
            fonts: project_folder + '/fonts/'
        },
        src: {
            html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
            css: [source_folder + "/scss/*.scss", 'node_modules/bootstrap/dist/css/bootstrap.css',  "!" + source_folder + "/scss/_*.scss"],
            js: [source_folder + '/js/**/*.js',    "!" + source_folder + "/js/**/_*.js"],
            img: source_folder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
            fonts: source_folder + '/fonts/*.ttf'
        },
        watch: {
            html: source_folder + '/**/*.html',
            css: source_folder + '/scss/**/*.scss',
            js: source_folder + '/js/**/*.js',
            img: source_folder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)'
        },
        clean: './' + project_folder + '/'
    }

const {src, task, dest, parallel, watch, series} = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webp-css'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    newer = require('gulp-newer'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlhint = require('gulp-htmlhint'),
    fs = require('fs');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: path.clean
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 7 versions'],
            cascade: true
        }))
        .pipe(webpcss(['.png', '.jpg', '.jpeg']))
        .pipe(dest(path.build.css))

        .pipe(clean_css())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function fonts() {
         src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

task('otf2ttf', () => {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'))
})

function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/_fonts.scss');
    console.log(file_content)
        if (file_content == "") {
        fs.writeFile(source_folder + '/scss/_fonts.scss', '', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (let i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname !== fontname) {
                        fs.appendFile(source_folder + '/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', '' ,cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

}

// function scripts() {
//     return src([
//         'node_modules/jquery/dist/jquery.min.js',
//         'app/js/app.js'
//     ]).pipe(concat('app.min.js'))
//         .pipe(uglify())
//         .pipe(dest('app/js/'))
//         .pipe(browserSync.stream())
// }

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(webp({
            quality: 70
        }))
        .pipe(newer(path.build.img))
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(newer(path.build.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    watch([path.watch.html], html);
    watch([path.watch.css], css);
    watch([path.watch.js], js);
    watch([path.watch.img], images)
}

function clean() {
    return del(path.clean);
}

const build = series(parallel(js, css, html, images, /*fonts */),/* fontsStyle */);

const browserUp = parallel(build, watchFiles, browserSync)


exports.fontsStyle =  fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.watch = browserUp;
exports.build = build;
exports.default = browserUp;


