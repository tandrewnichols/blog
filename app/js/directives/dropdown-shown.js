angular.module('app').directive('dropdownShown', function() {
  return {
    link: function($scope, $element, $attributes) {
      $element.parent().on('shown.bs.dropdown', function() {
        $scope.$eval($attributes.dropdownShown);
      });
    }
  };
});
