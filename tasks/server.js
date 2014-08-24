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
      server.kill();
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
    }, function() {
      console.log.apply(console, [].slice.call(arguments).filter( function(arg) {
        !!arg; 
      }));
    });
  });
};
