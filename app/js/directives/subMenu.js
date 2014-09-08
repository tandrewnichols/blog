angular.module('app').directive('subMenu', function($timeout) {
  var promises = {};
  return {
    link: function($scope, $element, $attributes) {
      var prop = $attributes.subMenu;
      var submenu = angular.element('[ng-show="' + prop + '"]');

      // Bind to mouseenter on parent element
      $element.bind('mouseenter', function() {
        // Iterate over other open menus
        for (var p in promises) {
          var promise = promises[p];
          // Cancel the promises
          if (promise.menu) {
            $timeout.cancel(promise.menu);
          }
          if (promise.submenu) {
            $timeout.cancel(promise.submenu);
          }
          // And then invoke the function immediately.
          // This prevents flashing, where to menus
          // are open simultaneously
          if (promise.func) {
            promise.func();
          }
        }

        // If we were on the submenu and came back to the parent
        // cancel the promise so that the menu stays open
        if (promises[prop]) {
          $timeout.cancel(promises[prop].submenu);
        }
        
        // Set the value of this menu to true and apply
        $scope[prop] = true;
        $scope.$apply();
      });

      // Bind to mouseleave on parent element
      $element.bind('mouseleave', function() {
        // Save a ref to the func for later use
        promises[prop] = {
          func: function() { $scope[prop] = false; } 
        };
        promises[prop].menu = $timeout(promises[prop].func, 100);
      });

      // Bind to mouseenter on child menu
      submenu.bind('mouseenter', function() {
        // Cancel the parent promise so that the menu stays open
        $timeout.cancel(promises[prop].menu);
      });

      // Bind to mouseleave on child menu
      submenu.bind('mouseleave', function() {
        promises[prop].submenu = $timeout(promises[prop].func, 100);
      });
    }
  };
});
