var extend = require('config-extend');
var nconf = require('nconf');

module.exports = function(req, res, next) {
  extend(res.locals, {
    modules: nconf.get('modules'),
    page: req.path,
    url: req.originalUrl.split('?')[0],
    dev: nconf.get('env') === 'development',
    recent: nconf.get('feed')
  });
  next();
};
