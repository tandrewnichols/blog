var _ = require('lodash');
var chalk = require('chalk');
var readme = [];
var coverage = [];

_('indeed task-master tinder-cli varity manta/cookie-domain manta/file-manifest manta/kindly manta/mixpanel-event-import manta/pedestrian manta/safe-obj'.split(' ')).each(function(mod) {
  readme.push({
    expand: true,
    cwd: '..',
    flatten: true,
    src: mod + '/README.md',
    dest: 'pages/modules/',
    rename: function(dest, src) {
      return dest + mod.replace('manta/', '') + '.md';  
    }
  });
  coverage.push({
    expand: true,
    cwd: '..',
    flatten: true,
    src: mod + '/coverage/coverage.html',
    dest: 'views/coverage/',
    rename: function(dest, src) {
      return dest + mod.replace('manta/', '') + '.html';  
    }
  });
});

module.exports = {
  readme: {
    files: readme
  },
  coverage: {
    files: coverage
  }
};
