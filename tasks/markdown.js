var cheerio = require('cheerio');
var postCompile = function(src, context) {
  var $ = cheerio.load(src);
  $('code').attr('ng-non-bindable', '');
  return $.html();
};

module.exports = {
  options: {
    postCompile: postCompile,
    markddownOptions: {
      gfm: true,
      highlight: 'manual'
    }
  },
  pages: {
    files: [
      {
        expand: true,
        src: 'pages/**/*.md',
        dest: 'views',
        ext: '.html'
      }
    ],
    options: {
      template: 'views/page.html'
    }
  },
  docs: {
    files: [
      {
        expand: true,
        src: 'docs/**/*.md',
        dest: 'views',
        ext: '.html'
      }
    ],
    options: {
      template: 'views/doc.html'
    }
  }
};
