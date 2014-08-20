var path = require('path');
var server;

module.exports = function(grunt) {
  grunt.registerTask('server', 'Start the express server', function() {
    if (server) {
      console.log('Restarting the express server');
      server.kill();
    } else {
      console.log('Starting the express server');
    }
    process.on('exit', function() {
      console.log('Stopping express server');  
      server.kill();
    });
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
