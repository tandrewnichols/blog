var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt);
  grunt.registerTask('run', ['clean', 'concat:dev', 'less:dev', 'markdown', 'server', 'watch']);
  grunt.registerTask('heroku:production', ['clean', 'concat:dist', 'uglify:dist', 'less:dist', 'markdown', 'server']);
};
