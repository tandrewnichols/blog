var router = module.exports = require('express').Router();

router.get('/', function(req, res) {
  res.render('blogHome', {
    title: 'Stubborn Child Process - programming blog | tandrewnichols'
  });
});
