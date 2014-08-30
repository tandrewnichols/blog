var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt, { production: true, development: false });
  grunt.registerTask('default', ['clean', 'copy', 'symlink:dev', 'concat:dev', 'ngAnnotate:app', 'less:dev', 'markdown', 'server', 'watch']);
  grunt.registerTask('build', ['clean', 'symlink:dist', 'concat:dist', 'ngAnnotate:app', 'uglify:dist', 'less:dist', 'markdown']);
};
