//------------------------------------------------------------------
//-------------- Load Plugins And Their Settings -------------------
const gulp = require('gulp');
const fs = require('fs');
const g = require('gulp-load-plugins')({ lazy: false });

const HTML_MIN_OPTS = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true,
};

let destPath;
let settings;
let environment = 'development';

try {
  settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'));
  destPath = settings[environment].dest_path;
} catch (error) {
  g.util.log(`MY LOG ==> ' ${error}`);
  process.exit();
}

//----------------------------------------------------
//------------------- Util Functions -----------------
const createJSTags = jsSources => {
  const createTag = url => `<script src="${url}"></script>`;
  return jsSources.map(url => createTag(url)).join('\n\t');
};

//----------------------------------------------------
//------------------- JS Tasks -----------------------
gulp.task('build-js', () => {
  return gulp.src('./build/bundle.js').pipe(gulp.dest(`${destPath}/js`));
});

//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-html', () => {

  const timestamp = +new Date();
  const stream = gulp.src('./src/index.html');
  let cssSources, jsSources;

  if (environment === 'development') {

    jsSources = ['js/bundle.js'];

    return stream
      .pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
      .pipe(g.replace('<!-- APP_NAME -->', settings[environment].app_name))
      .pipe(gulp.dest(destPath));

  } else {

    jsSources = [`/budget/js/bundle.js?tm=${timestamp}`];

    return stream
      .pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
      .pipe(g.replace('<!-- APP_NAME -->', settings[environment].app_name))
      .pipe(g.htmlmin(HTML_MIN_OPTS))
      .pipe(gulp.dest(destPath));

  }

});

//----------------------------------------------------
//------------------- Copy Assets Tasks --------------
gulp.task('copy-assets', () => {
  gulp.src('./assets/images/**/*').pipe(gulp.dest(`${destPath}/images`));
});

//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-dev', () => {
  environment = 'development';
  destPath = settings[environment].dest_path;
  g.runSequence('build-html', 'copy-assets');
});

gulp.task('build-live', () => {
  environment = 'production';
  destPath = settings[environment].dest_path;
  g.runSequence('build-js', 'build-html', 'copy-assets');
});
