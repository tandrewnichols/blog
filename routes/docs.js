var router = module.exports = require('express').Router();
var modules = require('nconf').get('modules');
var _ = require('lodash');

router.get('/:module', function(req, res) {
  var author = _(modules.tandrewnichols).pluck('name').contains(req.params.module).value() ? 'tandrewnichols' : 'mantacode';
  var module =  _.find(modules[author], { name: req.params.module });
  res.render('docs/' + author + '/' + req.params.module, {
    module: module,
    author: author,
    title: 'Readme - ' + req.params.module + ' | tandrewnichols',
    description: module.description.replace(/\.$/, '') + '. ' + module.version,
    keywords: req.params.module + ',node.js,npm,git'
  });
});
