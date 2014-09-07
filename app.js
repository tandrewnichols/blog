var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var swig = require('swig');
var fs = require('fs');
var loader = require('./lib/mod-loader');
var _ = require('lodash');
var extend = require('config-extend');
var env = process.env.NODE_ENV || 'development';
var nconf = require('nconf').argv().env().file({ file: './config/' + env + '.json' });
nconf.set('env', env);
var modules = loader({ mantacode: [], tandrewnichols: [] }).load('tandrewnichols').load('mantacode').val();

app.set('port', nconf.get('PORT'));
app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('layout', 'layout');
app.set('analytics', nconf.get('analytics'));
swig.setDefaults({
  loader: swig.loaders.fs(__dirname + '/views'),
  varControls: ['{{=', '}}'],
  tagControls: ['{%=', '%}']
});

app.use('/assets', express.static(__dirname + nconf.get('staticFilePath')));
app.use(function(req, res, next) {
  extend(res.locals, {
    modules: modules,
    page: req.path,
    url: req.originalUrl.split('?')[0],
    env: nconf.get('env')
  });
  next();
});

app.get('/', function(req, res) {
  res.render('home', { hideNav: nconf.get('env') === 'development' });
});

app.get('/modules/:module', function(req, res, next) {
  var author = _.contains(modules.tandrewnichols, req.params.module) ? 'tandrewnichols' : 'mantacode';

  res.render('modules/' + author + '/' + req.params.module, {
    moduleName: req.params.module,
    author: author,
    title: req.params.module
  });
});

app.get('/coverage/:module', function(req, res, next) {
  res.sendFile(__dirname + '/views/coverage/' + req.params.module + '.html');
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
