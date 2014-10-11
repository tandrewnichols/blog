var path = require('path');
var server;

var kill = function() {
  console.log('Stopping express server');
  server.kill();
};

module.exports = function(grunt) {
  grunt.registerTask('server', 'Start the express server', function() {
    if (server) {
      console.log('Restarting the express server');
      server.kill('SIGKILL');
      process.removeListener('exit', kill);
    } else {
      console.log('Starting the express server');
    }
    process.on('exit', kill);
    server = grunt.util.spawn({
      cmd: 'node',
      args: ['app'],
      opts: {
        stdio: 'inherit',
        cwd: path.resolve(__dirname + '/..')
      }
    }, function(err, result, code) {
      if (code && code > 0) {
        console.log(err, result, code);
      }
    });
  });
};
