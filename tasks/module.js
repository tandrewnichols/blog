var cp = require('child_process');
var fs = require('fs-extra');
var async = require('async');
var chalk = require('chalk');

module.exports = function(grunt, context) {
  grunt.registerMultiTask('module', 'Generate a report about a published module', function() {
    var done = this.async();
    var options = this.options();
    var t = this.target;
    var repo = context.paths[options.author] + '/' + t;
    var pkg = require(repo + '/package');
    async.parallel([
      function(next) {
        fs.copy(repo + '/README.md', context.paths.root + '/docs/' + options.author + '/' + t + '.md', function(err) {
          if(err) {
            next(err);
          } else {
            next(null, t + ' documendation successfully copied');
          }
        });
      }, function(next) {
        if (pkg.devDependencies['grunt-mocha-cov']) {
          var child = cp.spawn('grunt', ['mochacov:html'], { cwd: repo });
          child.on('close', function(code) {
            if (!code) {
              fs.copy(repo + '/coverage/coverage.html', context.paths.root + '/coverage/' + options.author + '/' + t + '.html', function(err) {
                if (err) {
                  next(err);
                } else {
                  next(null, t + ' coverage report successfully generated and copied');
                }
              });
            } else {
              next('mochacov returned code ' + code);
            }
          });
        } else {
          next(null, 'No coverage report present for ' + t);
        }
      },
    ], function(err, logs) {
      if (err) {
        grunt.fail.warn(err);
      } else {
        logs.forEach(function(log) {
          console.log(chalk.green(log));
        });
      }
    });
  });
};
