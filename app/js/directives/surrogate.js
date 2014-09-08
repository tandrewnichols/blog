angular.module('app').directive('surrogate', [function() {
  return {
    link: function($scope, $element, $attributes) {
      var surrogate = $attributes.surrogate;
      var e = $attributes.surrogateEvent || 'click';
      var trigger = $attributes.surrogateTrigger || evt;
      var events = e.split(',');
      var triggers = trigger.split(',');
      if (events.length === triggers.length) {
        for(var i = 0, l = events.length; i < l; i++) {
          $element.bind(events[i], (function(trig) {
            return function() {
              $(surrogate)[trig]();
            };
          })(triggers[i]));
        }
      } else if (triggers.length === 1) {
        for(var i = 0, l = events.length; i < l; i++) {
          $element.bind(events[i], function() {
              $(surrogate)[trig]();
            };
          })(triggers[i]));
        }
        
      $element.bind(e, function() {
        $(surrogate)[trigger]();
      });
    }
  };
}]);

