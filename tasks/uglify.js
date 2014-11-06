module.exports = {
  dist: {
    options: {
      sourceMap: true,
      sourceMapName: 'generated/app.js.map',
      compress: true
    },
    src: 'generated/app.js',
    dest: 'public/app.js'
  }
};
