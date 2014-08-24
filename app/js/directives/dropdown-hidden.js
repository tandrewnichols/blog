angular.module('app').directive('dropdownHidden', function() {
  return {
    link: function($scope, $element, $attributes) {
      $element.parent().on('hidden.bs.dropdown', function() {
        $scope.$eval($attributes.dropdownHidden);
      });
    }
  };
});
