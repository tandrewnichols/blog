module.exports = {
  less: {
    files: ['app/css/**/*.less'],
    tasks: ['less:dev', 'server']
  },
  server: {
    files: ['app.js', 'lib/**/*.js'],
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
  modules: {
    files: ['modules/**/*.md', 'views/module.html'],
    tasks: ['clean:modules', 'markdown:modules', 'server']
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
