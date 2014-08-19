module.exports = {
  posts: {
    files: [
      {
        expand: true,
        src: 'posts/**/*.md',
        dest: 'views/posts',
        ext: '.html'
      }
    ],
    options: {
      template: 'views/post.html'
    }
  },
  pages: {
    files: [
      {
        expand: true,
        src: 'pages/**/*.md',
        dest: 'views/pages/',
        ext: '.html'
      }
    ],
    options: {
      template: 'views/page.html'
    }
  }
};
