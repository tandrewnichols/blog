var router = module.exports = require('express').Router();

router.get('/', function(req, res) {
  res.render('blogHome', {
    title: 'Home - Stubborn Child Process | tandrewnichols',
    description: 'Learn more about node.js, angular.js, and web application development from Andrew Nichols, frontend programmer at Manta and former writer and teacher.',
    keywords: 'node.js,angular.js,git,bash,developer,blog'
  });
});
