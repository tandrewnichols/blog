var cp = require('child_process');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerTask('server', 'Start the express server', function() {
    var done = this.async();
    var server = cp.spawn('node', ['app'], { cwd: path.resolve(__dirname + '/..') });
    server.on('close', function(code) {
      console.log('Stopping express server');  
    });
    process.on('exit', function() {
      server.kill();
    });
    server.stdout.on('data', function(data) {
      data = data.toString();
      if (~data.indexOf('Express server listening')) {
        done();
      }
    });
  });
};
