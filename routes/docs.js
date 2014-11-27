var router = module.exports = require('express').Router();
var modules = require('nconf').get('modules');
var _ = require('lodash');

router.get('/:module', function(req, res) {
  var author = _(modules.tandrewnichols).pluck('name').contains(req.params.module).value() ? 'tandrewnichols' : 'mantacode';
  
  res.render('docs/' + author + '/' + req.params.module, {
    module: _.find(modules[author], { name: req.params.module }),
    author: author,
    title: req.params.module
  });
});
