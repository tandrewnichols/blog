module.exports = {
  posts: {
    files: [
      {
        expand: true,
        src: 'posts/**/*.md',
        dest: 'views',
        ext: '.html'
      }
    ],
    options: {
      template: 'views/post.html',
      markdownOptions: {
        gfm: true,
        highlight: 'manual'
      }
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
      template: 'views/page.html',
      markdownOptions: {
        gfm: true,
        highlight: 'manual'
      }
    }
  }
};
