var nconf = require('./lib/nconf').init();
var http = require('http');
var express = require('express');
var app = express();
var swig = require('swig');
var fm = require('file-manifest');
var routes = fm.generate('./routes');
var middleware = fm.generate('./lib/middleware');

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
app.use(middleware.locals);

app.use('/', routes.home);
app.use('/docs', routes.docs);
app.use('/coverage', routes.coverage);
app.use('/blog', routes.blog);
app.use('/social', routes.social);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
