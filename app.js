var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var nconf = require('nconf')
  .argv()
  .env()
  .file({ file: './config/' + (process.env.NODE_ENV || 'development') + '.json' });

app.set('port', nconf.get('PORT'));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use('assets', express.static(__dirname + '/public'));

app.get('/', function() {

});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
