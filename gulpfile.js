// PACKAGES //
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var config = require('./config');
var path = require('path');
// MONGO //

// only kill mongo if it was used
var usedMongo = false;

// require only one ctrl+c to exit
process.once('SIGINT', function(){
    if (usedMongo) {
        console.log('\nshutting down mongod...');
        exec('pgrep mongod | xargs kill; kill ' + process.pid);
    } else {
        exec('kill ' + process.pid);
    }
});


// call mongod to start mongo database
var startMongo = function () {
    usedMongo = true;
    if(config.winMachine) {
      exec('cd C:/"Program Files"/MongoDB/server/3.4/bin && mongod --dbpath ' + path.join(__dirname, config.mongoUri), function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    } else {
      exec('mongod --dbpath ./' + config.mongoUri, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    }
};
// APP SCRIPTS //

// start the database
gulp.task('startdb', function () {
    startMongo();
});

// run node on the server file
gulp.task('runserver', ['startdb'], function () {
    nodemon({script: 'bin/www'});
});

//build the sass file
gulp.task('styles', function() {
  gulp.src('client/public/scss/stylesheet.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('client/public/css/'));
});


// UPDATING //

// install npm dependencies
gulp.task('install', function () {
    exec('npm install');
});

// run npm update and copy frontend files to lib folder
gulp.task('update', ['install']);

// DEFAULT //

gulp.task('default', ['runserver', 'styles']);
