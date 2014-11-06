var path = require('path');
var root = path.resolve(__dirname, '..');
var me = path.resolve(root, '..');

module.exports = {
  tandrewnichols: me,
  mantacode: me + '/manta',
  root: root,
  bower: root + '/bower_components',
  coverage: root + '/coverage',
  generated: root + '/generated',
  'public': root + '/public',
  views: root + '/views',
  pages: root + '/pages',
  posts: root + '/posts',
  tasks: root + '/tasks',
  vendor: root + '/vendor',
  modules: root + '/modules',
  node: root + '/node_modules',
  app: root + '/app'
};
