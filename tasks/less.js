module.exports = {
  files: ['app/css/main.less'],
  dist: {
    options: {
      cleancss: true,
      sourceMap: true
    },
    files: {
      'public/app.css': ['<%= less.files %>']
    }
  },
  dev: {
    files: {
      'generated/app.css': ['<%= less.files %>']
    }
  }
};
