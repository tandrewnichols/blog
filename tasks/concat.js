module.exports = {
  files: [
    'jquery/dist/jquery.js',
    'bootstrap/dist/js/bootstrap.js',
    'angular/angular.js',
    'app/js/app.js',
    'app/js/**/*.js'
  ],
  options: {
    separator: ';',
  },
  dist: {
    options: {
      sourceMap: true
    },
    files: [
      {
        expand: true,
        cwd: 'bower_compoentents',
        src: ['<%= concat.files %>'],
        dest: 'generated/app.js'
      },
    ]
  },
  dev: {
    files: [
      {
        expand: true,
        cwd: 'bower_compoentents',
        src: ['<%= concat.files %>'],
        dest: 'generated/app.js'
      }
    ]
  }
};
