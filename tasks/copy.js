module.exports = {
  coverage: {
    files: [
      {
        expand: true,
        flatten: true,
        src: ['pages/coverage/**/*.html'],
        dest: 'views/pages/coverage/'
      }
    ]
  }
};
