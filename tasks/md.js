var cheerio = require('cheerio');
var postCompile = function(src) {
  var $ = cheerio.load(src);
  $('code').attr('ng-non-bindable', '');
  return $.html();
};

module.exports = {
  options: {
    mm: {
      postCompile: postCompile,
      context: {
        author: 'Andrew Nichols'
      },
      marked: {
        gfm: true
      }
    }
  },
  pages: {
    options: {
      wrapper: 'views/page.html'
    },
    files: {
      'views': 'pages/**/*.md'
    }
  },
  docs: {
    options: {
      wrapper: 'views/doc.html'
    },
    files: {
      'views': 'docs/**/*.md'
    }
  },
  posts: {
    options: {
      wrapper: 'views/post.html'
    },
    files: {
      'views': 'posts/**/*.md'
    }
  }
};
