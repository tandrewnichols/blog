var tm = require('task-master');

module.exports = function(grunt) {
  tm(grunt);
  grunt.registerTask('default', ['clean', 'less:dev', 'watch']);
  grunt.registerTask('heroku:production', ['clean', 'less:prod']);
};
