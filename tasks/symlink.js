module.exports = {
  expanded: {
    files: [
      {
        expand: true,
        overwrite: false,
        cwd: 'bower_components/bootstrap/fonts',
        src: ['*'],
        dest: 'public/fonts'
      },
      {
        expand: true,
        overwrite: false,
        cwd: 'bower_components/bootstrap/fonts',
        src: ['*'],
        dest: 'generated/fonts'
      }
    ]
  }
};
