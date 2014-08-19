var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt, { production: true, development: false });
  grunt.registerTask('default', ['clean', 'symlink', 'concat:dev', 'less:dev', 'markdown', 'server', 'watch']);
  grunt.registerTask('build', ['clean', 'symlink', 'concat:dist', 'uglify:dist', 'less:dist', 'markdown']);
};
