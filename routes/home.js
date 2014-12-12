var router = module.exports = require('express').Router();
var nconf = require('nconf');

router.get('/', function(req, res) {
  res.render('home');
});
