var router = module.exports = require('express').Router();
var nconf = require('nconf');

router.get('/', function(req, res) {
  res.render('home', {
    hideNav: true,
    title: 'tandrewnichols - node.js enthusiast and blogger | Andrew Nichols',
    description: 'Find documentation for npm modules published by tandrewnichols and blog posts on node.js, angular.js, and general programming.',
    keywords: 'node.js, angular.js, child process, blog, npm, git, programming'
  });
});
