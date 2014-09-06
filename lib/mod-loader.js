var fm = require('file-manifest');
var path = require('path');

module.exports = function(memo) {
  var loader = {
    load: function(name) {
      console.log(name, memo);
      fm.generate('../views/modules/' + name, { memo: memo, reducer: function(options, manifest, file) {
        memo[name].push(file.name);
        return memo;
      }});
      console.log(name, memo);
      return loader;
    },
    val: function() {
      return memo;
    }
  };
  return loader;
};
