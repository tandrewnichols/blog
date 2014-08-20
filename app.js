var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var swig = require('swig');
var fs = require('fs');
var nconf = require('nconf')
  .argv()
  .env()
  .file({ file: './config/' + (process.env.NODE_ENV || 'development') + '.json' });

app.set('port', nconf.get('PORT'));
app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('layout', 'layout');
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/views') });

app.use('/assets', express.static(__dirname + nconf.get('STATIC_FILE_PATH')));

app.get('/', function(req, res) {
  res.render('home', {});
});

app.get('/:module', function(req, res, next) {
  fs.exists(__dirname + '/views/pages/modules/' + req.params.module + '.html', function(yes) {
    if (yes) res.render('pages/modules/' + req.params.module);
    else next();
  });
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
