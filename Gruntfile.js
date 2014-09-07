var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt, 'dependencies');
  grunt.registerTask('default', ['clean', 'copy', 'symlink:dev', 'concat:dev', 'ngAnnotate:app', 'less:dev', 'markdown', 'server', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'symlink:dist', 'concat:dist', 'ngAnnotate:app', 'uglify:dist', 'less:dist', 'markdown']);
};
