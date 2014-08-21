angular.module('app', []).run(function($rootScope) {
  $rootScope.log = function() {
    console.log.apply(console, arguments); 
  };
  $rootScope.alert = function() {
    alert.apply(alert, arguments);
  };
});
