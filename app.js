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
app.use('/assets', express.static(__dirname + nconf.get('STATIC_FILE_PATH')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/home.html');
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
