var fm = require('file-manifest');
var path = require('path');

module.exports = function(memo) {
  var loader = {
    load: function(name) {
      fm.generate('../views/modules/' + name, { memo: memo, reducer: function(options, manifest, file) {
        memo[name].push(file.name);
        return memo;
      }});
      return loader;
    },
    val: function() {
      return memo;
    }
  };
  return loader;
};
