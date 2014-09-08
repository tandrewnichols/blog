angular.module('app', ['ngAnimate', 'angular-lodash']).run(function($rootScope, $window) {
  $rootScope.log = function() {
    console.log.apply(console, arguments); 
  };
  $rootScope.alert = function() {
    alert.apply(null, arguments);
  };
  $rootScope.mixpanel = {
    people: {}
  };
  _.each(_.methods($window.mixpanel), function(f) {
    $rootScope.mixpanel[f] = function() { $window.mixpanel[f].apply($window.mixpanel, arguments); };
  });
  _.each(_.methods($window.mixpanel.people), function(f) {
    $rootScope.mixpanel.people[f] = function() { $window.mixpanel.people[f].apply($window.mixpanel, arguments); };
  });
});
