var fm = require('file-manifest');
var _ = require('lodash');

module.exports = function(grunt) {
  grunt.registerMultiTask('blog', 'Publish a blog post', function() {
    var posts = require('../posts.json');
    var name = this.args[0];
    console.log(name);
  });
  return {
    publish: {},
    edit: {}
  };
};
