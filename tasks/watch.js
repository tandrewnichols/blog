module.exports = {
  less: {
    files: ['app/css/*.less'],
    tasks: ['less:dev', 'server']
  },
  server: {
    files: ['app.js'],
    tasks: ['server']
  },
  templates: {
    files: ['views/*.html'],
    tasks: ['server']
  }
};
