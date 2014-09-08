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
  },
  imgDev: {
    files: [
      {
        expand: true,
        cwd: 'app/img',
        src: '**/*.{jpg,png,gif}',
        dest: 'generated/img/'
      }
    ]
  },
  imgDist: {
    files: [
      {
        expand: true,
        cwd: 'app/img',
        src: 'app/img/**/*.{jpg,png,gif}',
        dest: 'public/img/'
      }
    ]
  }
};
