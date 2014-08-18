module.exports = {
  files: ['bower_components/bootstrap/less/bootstrap.less', 'app/css/main.css'],
  prod: {
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
      'dev/app.css': ['<%= less.files %>']
    }
  }
};
