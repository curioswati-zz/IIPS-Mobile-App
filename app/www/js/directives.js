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
})
.directive('wcUnique', ['API', function (API) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {

      element.bind('focus', function(e) {
        ngModel.$setValidity('rollunique', true);
        ngModel.$setValidity('emailunique', true);        
      })

      element.bind('blur', function (e) {
        if (!ngModel || !element.val())
          return;

        var keyProperty = scope.$eval(attrs.wcUnique);

        var currentValue = element.val();

        if (keyProperty.property == 'rollno') {
          API.checkUniqueRoll(keyProperty.property, currentValue)
          .then(function (unique) {
            //Ensure value that being checked hasn't changed
            //since the Ajax call was made
            if (currentValue == element.val()) {
                ngModel.$setValidity('rollunique', unique);
            }
          },
          function () {
            //Probably want a more robust way to handle an error
            //For this demo we'll set unique to true though
            // ngModel.$setValidity('unique', true);
          });          
        }
        else if (keyProperty.property == 'email') {
          API.checkUniqueEmail(keyProperty.property, currentValue)
          .then(function (unique) {
            console.log(unique)
            //Ensure value that being checked hasn't changed
            //since the Ajax call was made
            if (currentValue == element.val()) {
                ngModel.$setValidity('emailunique', unique);
            }
          },
          function (err) {
            //Probably want a more robust way to handle an error
            //For this demo we'll set unique to true though
            // ngModel.$setValidity('unique', true);
          });
        }

      });
    }
  }
}]);