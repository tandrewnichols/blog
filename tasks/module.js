var cp = require('child_process');
var fs = require('fs-extra');
var async = require('async');
var chalk = require('chalk');
var cheerio = require('cheerio');
var _ = require('lodash');
var check = '✓';
var x = '✗';
var manifest = {
  tandrewnichols: [],
  mantacode: []
};

module.exports = function(grunt, context) {
  grunt.registerMultiTask('module', 'Generate a report about a published module', function() {
    var done = this.async();
    var options = this.options();
    var t = this.target;

    async.each(options.modules, function(m, next) {
      var repo = context.paths[t] + '/' + m;
      var pkg = require(repo + '/package');
      var mod = {
        name: m,
        description: pkg.description,
        version: 'v' + pkg.version
      };
      fs.copy(repo + '/README.md', context.paths.root + '/docs/' + t + '/' + m + '.md', function(err) {
        if (err) {
          console.log(chalk.red(x), 'Unable to copy documentation for', m + ':', err);
        } else {
          console.log(chalk.green(check), 'Copied documentation for', m);
        }

        if (pkg.devDependencies && pkg.devDependencies['grunt-mocha-cov'] && !~options.uncovered.indexOf(m)) {
          var child = cp.spawn('grunt', ['mochacov:html', '--force'], { cwd: repo });
          child.on('close', function(code) {
            if (!code) {
              fs.copy(repo + '/coverage/coverage.html', context.paths.root + '/coverage/' + t + '/' + m + '.html', function(err) {
                if (err) {
                  console.log(chalk.red(x), 'Unable to copy coverage for', m + ':', err);
                } else {
                  console.log(chalk.green(check), 'Copied coverage for', m);
                }
                fs.readFile(repo + '/coverage/coverage.html', function(err, coverage) {
                  var $ = cheerio.load(coverage);
                  mod.coverage = $('#coverage > #stats .percentage').text();
                  manifest[t].push(mod);
                  next();
                });
              });
            } else {
              console.log(chalk.red(x), 'Unable to generate coverage for', m + ':', err);
              manifest[t].push(mod);
            }
          });
        } else {
          console.log(chalk.cyan('Skipping coverage for ' + m));
          manifest[t].push(mod);
          next();
        }
      });
    }, function(err) {
      if (err) {
        console.log();
        console.log(chalk.red(err));
      }
      fs.writeFile(context.paths.root + '/config/modules.json', JSON.stringify(manifest, null, 2), function(err) {
        console.log();
        if (err) {
          console.log(chalk.red(err));
        } else {
          console.log(chalk.green('Module manifest updated'));
        }
        done();
      });
    });
  });

  return {
    tandrewnichols: {
      options: {
        modules: ['grunt-simple-git', 'grunt-simple-istanbul', 'grunt-simple-npm', 'grunt-travis-matrix', 'indeed', 'key-list', 'simple-cli', 'task-master', 'varity'],
        uncovered: ['varity']
      }
    },
    mantacode: {
      options: {
        modules: ['cookie-domain', 'expressive', 'file-manifest', 'kindly', 'mixpanel-event-import', 'pedestrian', 'safe-obj'],
        uncovered: []
      }
    }
  };
};
