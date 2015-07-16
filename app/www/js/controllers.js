angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) { 
    
    $scope.data = {};

    $scope.register = function() {
      $state.go('register');
    };
})

.controller('RegisterCtrl', function($scope, $state) {
    $scope.data = {};
 
    $scope.submit = function() {
        $state.go('login');
    };

    $scope.backToLogin = function() {
        $state.go('login');
    }
})