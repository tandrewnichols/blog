angular.module('app').directive('dropdownHide', function() {
  return {
    link: function($scope, $element, $attributes) {
      $element.parent().on('hide.bs.dropdown', function() {
        $scope.$eval($attributes.dropdownHide);
      });
    }
  };
});
