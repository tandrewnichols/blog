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
  },
  posts: {
    files: ['posts/**/*.md'],
    tasks: ['clean:posts', 'markdown:posts', 'server']
  },
  pages: {
    files: ['pages/**/*.md'],
    tasks: ['clean:pages', 'markdown:pages', 'server']
  }
};
