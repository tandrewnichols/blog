module.exports = {
  files: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-waypoints/waypoints.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/angular/angular.js',
    'node_modules/lodash/lodash.js',
    'bower_components/angular-lodash/angular-lodash.js',
    'vendor/js/**/*.js',
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
    src: ['<%= concat.files %>'],
    dest: 'generated/app.js'
  },
  dev: {
    src: ['<%= concat.files %>'],
    dest: 'generated/app.js'
  }
};
