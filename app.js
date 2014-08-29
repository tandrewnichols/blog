var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var swig = require('swig');
var fs = require('fs');
var fm = require('file-manifest');
var _ = require('lodash');
var extend = require('config-extend');
var nconf = require('nconf')
  .argv()
  .env()
  .file({ file: './config/' + (process.env.NODE_ENV || 'development') + '.json' });

var modules = fm.generate(__dirname + '/views/pages/modules/tandrewnichols', function(memo, file) {
  memo.me = memo.me || [];
  memo.mantacode = memo.mantacode || [];
  if (~file.indexOf('tandrewnichols')) memo.me.push(path.basename(file, '.html'));
  else if (~file.indexOf('mantacode')) memo.mantacode.push(path.basename(file, '.html'));
  return memo;
}, []);

app.set('port', nconf.get('PORT'));
app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('layout', 'layout');
app.set('analytics', nconf.get('analytics'));
swig.setDefaults({ loader: swig.loaders.fs(__dirname + '/views') });

app.use('/assets', express.static(__dirname + nconf.get('staticFilePath')));
app.use(function(req, res, next) {
  extend(res.locals, {
    modules: modules,
    page: req.path,
    url: req.originalUrl.split('?')[0]
  });
  next();
});

app.get('/', function(req, res) {
  res.render('home', {});
});

app.get('/modules/:module', function(req, res, next) {
  var author = _.contains(modules.me, req.params.module) ? 'tandrewnichols' : 'mantacode';

  res.render('pages/modules/' + author + '/' + req.params.module, {
    moduleName: req.params.module,
    author: author,
    title: req.params.module
  });
});

app.get('/coverage/:module', function(req, res, next) {
  res.render('pages/coverage/' + req.params.module, {
    moduleName: req.params.module,
    title: req.params.module
  });
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
