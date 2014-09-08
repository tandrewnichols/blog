var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt, 'dependencies');
  grunt.registerTask('default', ['clean', 'copy:coverage', 'copy:imgDev', 'symlink:dev', 'concat:dev', 'ngAnnotate:app', 'less:dev', 'markdown', 'server', 'watch']);
  grunt.registerTask('build', ['clean', 'copy:coverage', 'copy:imgDist', 'symlink:dist', 'concat:dist', 'ngAnnotate:app', 'uglify:dist', 'less:dist', 'markdown']);
};
