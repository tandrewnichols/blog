var router = module.exports = require('express').Router();

router.get('/:module', function(req, res) {
  res.sendFile(__dirname + '/views/coverage/' + req.params.module + '.html');
});
