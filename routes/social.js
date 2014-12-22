var router = module.exports = require('express').Router();

router.get('/', function(req, res) {
  res.render('social', {
    title: 'Social - tandrewnichols | Andrew Nichols',
    description: 'Find profile information for tandrewnichols on Github, npm, Twitter, and Stackoverflow.',
    keywords: 'node.js,angular.js,npm,git,programming,twitter'
  });
});
