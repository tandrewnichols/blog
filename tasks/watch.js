module.exports = {
  less: {
    files: ['app/css/**/*.less'],
    tasks: ['less:dev', 'server']
  },
  server: {
    files: ['app.js'],
    tasks: ['server']
  },
  templates: {
    files: ['views/*.html', '!views/post.html', '!views/page.html'],
    tasks: ['server']
  },
  posts: {
    files: ['posts/**/*.md', 'views/post.html'],
    tasks: ['clean:posts', 'markdown:posts', 'server']
  },
  pages: {
    files: ['pages/**/*.md', 'views/page.html'],
    tasks: ['clean:pages', 'markdown:pages', 'server']
  },
  tasks: {
    files: ['tasks/**/*.js'],
    tasks: ['clean', 'symlink:dev', 'concat:dev', 'less:dev', 'markdown', 'server']
  },
  js: {
    files: ['app/js/**/*.js'],
    tasks: ['concat:dev', 'server']
  }
};
