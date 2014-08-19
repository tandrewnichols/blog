module.exports = {
  posts: {
    src: ['posts/**/*.md'],
    dest: 'views/posts/',
    options: {
      template: 'app/templates/post.html'
    }
  },
  pages: {
    src: ['pages/**/*.md'],
    dest: 'views/pages/',
    options: {
      template: 'app/templates/page.html'
    }
  }
};
