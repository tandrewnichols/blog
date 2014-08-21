var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt, { production: true, development: false });
  grunt.registerTask('default', ['clean', 'symlink:dev', 'concat:dev', 'less:dev', 'markdown', 'server', 'watch']);
  grunt.registerTask('build', ['clean', 'symlink:dist', 'concat:dist', 'uglify:dist', 'less:dist', 'markdown']);
};
