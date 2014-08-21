angular.module('app').directive('tweet', function() {
  return {
    link: function($scope, $element, $attributes) {
      $element.on('click', function(event) {
        event.preventDefault();
        var top = ($(window).height() - 400) / 2;
        var left = ($(window).width() - 575) / 2;
        var text = $attributes.tweet ? 'text=' + encodeURIComponent($attributes.tweet) : '';
        var tags = $attributes.tweetTags ? 'hashtags=' + encodeURIComponent($attributes.tweetTags) : '';
        var query = ['?via=tandrewnichols', text, tags].filter(function(param) {
          return !!param;
        }).join('&');
        window.open($attributes.href + query, 'Twitter', 'status=1,width=575,height=400,top=' + top + ',left=' + left);
      });
    }
  };
});
