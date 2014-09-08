angular.module('app').directive('surrogate', [function() {
  return {
    link: function($scope, $element, $attributes) {
      var surrogate = $attributes.surrogate;
      var e = $attributes.surrogateEvent || 'click';
      var trigger = $attributes.surrogateTrigger || e;
      var events = e.split(',');
      var triggers = trigger.split(',');
      if (events.length === triggers.length) {
        events.forEach(function(evt, i) {
          $element.bind(evt, function() {
            $(surrogate)[triggers[i]]();
          });
        });
      } else if (triggers.length === 1 && events.length > 1) {
        events.forEach(function(evt) {
          $element.bind(evt, function() {
            $(surrogate)[triggers[0]]();
          });
        });
      } else if (events.length === 1 && triggers.length > 1) {
        triggers.forEach(function(trig) {
          $element.bind([events[0]], function() {
            $(surrogate)[trig]();
          });
        });
      }
    }
  };
}]);

