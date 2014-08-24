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

var modules = fm.generate(__dirname + '/views/pages/modules', function(memo, file) {
  var content = fs.readFileSync(file, 'utf8');
  var basename = path.basename(file, '.html');
  if (content.indexOf('mantacode') > -1) {
    memo.mantacode = memo.mantacode || [];
    memo.mantacode.push(basename);
  } else if (content.indexOf('tandrewnichols') > -1) {
    memo.me = memo.me || [];
    memo.me.push(basename);
  }
  return memo;
});

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

app.get('/:module', function(req, res, next) {
  var author;
  if (_(modules.me).contains(req.params.module)) author = 'tandrewnichols';
  else if ( _(modules.mantacode).contains(req.params.module)) author = 'mantacode';

  if (author) {
    res.render('pages/modules/' + req.params.module, {
      moduleName: req.params.module,
      author: author,
      title: req.params.module
    });
  }
  else next();
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
