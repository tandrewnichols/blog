module.exports = {
  options: {
    separator: ';',
  },
  dist: {
    options: {
      sourceMap: true
    },
    src: ['<%= files.js %>'],
    dest: 'generated/app.js'
  },
  dev: {
    src: ['<%= files.js %>'],
    dest: 'generated/app.js'
  }
};
