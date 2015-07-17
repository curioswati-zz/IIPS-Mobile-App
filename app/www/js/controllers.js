angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) { 
    
    $scope.data = {};

    $scope.register = function() {
      $state.go('register');
    };
    $scope.login = function() {
        $state.go('quote');
    }

    $scope.forgot = function() {
        alert("How could you forget your password");
    }
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

.controller('QuoteCtrl', function($scope, $state) {
    setTimeout(function() {
        $state.go('tab');
    }, 3000);
})

.controller('TabCtrl', function($scope, $state, ClassDetails) {

    $scope.showClassDetails = false;

    $scope.showInfo = function() {
        if ($scope.showClassDetails === true) {
            $scope.showClassDetails = false;
        }
        else {
            $scope.showClassDetails = true;
        }
    };

    $scope.logout = function() {
        $state.go('login');
    };

    $scope.classDetails = ClassDetails.all();
})

.controller('DashCtrl', function($scope, $state, Subjects) {

    $scope.data = {};

    $scope.openSyllabus = function() {
        $state.go('tab.syllabus');
    };

    $scope.openSchedule = function() {
        $state.go('tab.schedule');
    };

    $scope.goBack = function() {
        $state.go('tab.dash');
    };

    $scope.subjects = Subjects.all();

})

.controller('ProCtrl', function($scope, $state) {
    $scope.data = {};
    $scope.editProfile = function() {
        $state.go('tab.edit-profile');
    };

    $scope.saveChanges = function() {
        $state.go('tab.profile');
    }

    $scope.goBack = function() {
        $state.go('tab.profile');
    }
});
