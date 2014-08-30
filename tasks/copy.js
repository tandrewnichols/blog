module.exports = {
  coverage: {
    files: [
      {
        expand: true,
        flatten: true,
        src: ['coverage/**/*.html'],
        dest: 'views/coverage/'
      }
    ]
  }
};
