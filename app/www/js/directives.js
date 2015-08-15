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
});