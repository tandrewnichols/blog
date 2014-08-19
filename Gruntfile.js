var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt);
  grunt.registerTask('default', ['clean', 'symlink', 'concat:dev', 'less:dev', 'markdown', 'server', 'watch']);
  grunt.registerTask('heroku:production', ['clean', 'symlink', 'concat:dist', 'uglify:dist', 'less:dist', 'markdown', 'server']);
};
