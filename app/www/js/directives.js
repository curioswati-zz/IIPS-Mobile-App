angular.module('iips-app.directives', [])

.directive('pwCheck', function () {
  return {
    require: 'ngModel',
    scope: {
      pwCheck: '='
    },
    link: function(scope, element, attrs, ngModel) {

      scope.$watch('pwCheck', function() {
        ngModel.$validate(); // validate again when match value changes
      });

      ngModel.$validators.match = function(modelValue) {
        if (!modelValue || !scope.pwCheck || ngModel.$error.minlength) {
          return true;
        }
        return modelValue === scope.pwCheck;
      };
    }
  };
})
.directive('onSwipeRight', function($parse, $ionicGesture) {
    return {
        restrict :  'A',
        link : function(scope, elem, attrs) {
            var fn = $parse(attrs.onSwipeRight);
            $ionicGesture.on('swiperight', function(event) {
                scope.$apply(function() {
                    fn(scope, {$event:event});
                });
            }, elem);
        }
    }
});