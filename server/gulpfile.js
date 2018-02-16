// PACKAGES //
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let exec = require('child_process').exec;
let settings = require('./settings');
let path = require('path');

// MONGO //

// only kill mongo if it was used
let usedMongo = false;

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
let startMongo = function () {
    usedMongo = true;
    if(settings.winMachine) {
      exec('cd C:/"Program Files"/MongoDB/server/3.4/bin && mongod --dbpath ' + path.join(__dirname, settings.mongoUri), function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    } else {
      exec('mongod --dbpath ./' + settings.mongoUri, function (err, stdout, stderr) {
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
    nodemon({script: 'bin/www', ignore: 'public'});
});

// UPDATING //

// install npm dependencies
gulp.task('install', function () {
    exec('npm install');
});

// run npm updater
gulp.task('update', ['install']);

// DEFAULT //

gulp.task('default', ['runserver']);
