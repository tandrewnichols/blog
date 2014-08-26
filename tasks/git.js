var cp = require('child_process');
var _ = require('lodash');
_.mixin(require('underscore.string'));

module.exports = function(grunt) {
  grunt.registerMultiTask('git', 'Git related tasks',  function() {
    var done = this.async();
    var options = this.options();
    var target = this.target;

    // Build out git options
    var gitOptions = _.chain(options).omit('stdio', 'cwd').keys().reduce(function(memo, key) {
      memo.push('--' + _(key).dasherize());
      // Specifically allow "true" to mean "this flag has no arg with it"
      if (options[key] !== true) {
        memo.push(options[key]);
      }
    }, []).value();
    
    // Allow multiple tasks that run the same git command
    if (this.data.cmd) {
      var cmdArgs = this.data.cmd.split(' ');
      target = cmdArgs.shift();
      if (target === 'git') {
        target = cmdArgs.shift();
      }
      gitOptions = cmdArgs.concat(gitOptions);
    }
    
    console.log(target, gitOptions);
    // Create git process
    var gitCmd = cp.spawn('git', [target].concat(gitOptions), { stdio: options.stdio || 'inherit', cwd: options.cwd || '.' });
    gitCmd.on('close', function(code) {
      done();
    });
  });

  return {
    add: {
      options: {
        all: true
      }
    },
    commit: {
      options: {
        message: 'Autocommit for heroku deploy'
      }
    },
    heroku: {
      cmd: 'push heroku master',
    },
    origin: {
      cmd: 'push origin master'
    }
  }
}
