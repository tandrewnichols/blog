angular.module('app').directive('dropdownShow', function() {
  return {
    link: function($scope, $element, $attributes) {
      $element.parent().on('show.bs.dropdown', function() {
        $scope.$eval($attributes.dropdownShow); 
      });
    }
  };
});
