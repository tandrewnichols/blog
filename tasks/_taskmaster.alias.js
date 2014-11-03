module.exports = {
  'default': ['clean', 'copy:coverage', 'copy:imgDev', 'symlink:dev', 'concat:dev', 'ngAnnotate:app', 'less:dev', 'markdown', 'server', 'watch'],
  build: ['clean', 'copy:coverage', 'copy:imgDist', 'symlink:dist', 'concat:dist', 'ngAnnotate:app', 'uglify:dist', 'less:dist', 'markdown']
};
