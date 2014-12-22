module.exports = {
  less: {
    files: ['app/css/**/*.less'],
    tasks: ['less:dev']
  },
  server: {
    files: ['app.js', 'routes/**/*.js', 'lib/**/*.js'],
    tasks: ['server'],
    options: {
      spawn: false
    }
  },
  templates: {
    files: ['views/*.html', '!views/post.html', '!views/page.html'],
    tasks: ['server'],
    options: {
      spawn: false
    }
  },
  posts: {
    files: ['posts/**/*.md', 'views/post.html'],
    tasks: ['clean:posts', 'md:posts', 'server'],
    options: {
      spawn: false
    }
  },
  pages: {
    files: ['pages/**/*.md', 'views/page.html'],
    tasks: ['clean:pages', 'md:pages', 'server'],
    options: {
      spawn: false
    }
  },
  docs: {
    files: ['docs/**/*.md', 'views/doc.html'],
    tasks: ['clean:docs', 'md:docs', 'server'],
    options: {
      spawn: false
    }
  },
  tasks: {
    files: ['tasks/**/*.js'],
    tasks: ['clean', 'symlink:dev', 'concat:dev', 'less:dev', 'md', 'server'],
    options: {
      spawn: false
    }
  },
  js: {
    files: ['app/js/**/*.js'],
    tasks: ['concat:dev']
  }
};
