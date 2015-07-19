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

.controller('RegisterCtrl', function($scope, $state) { //, $cordovaSQLite) {

    // $scope.registerData = {};

    $scope.register = function() {
        // var query = "INSERT INTO register\
        //               (reg-id, fullname, course, sem,\
        //                roll-no, email) VALUES (?,?,?,?,?,?,?)";
        
        // $cordovaSQLite.execute(db, query, [registerData.reg-id, registerData.fullname, registerData.course, registerData.sem,
        //                registerData.roll-no, registerData.email, registerData.course])

        //                 .then(function(res) {
        //                     console.log("INSERT ID -> " + res.registerData.reg-id);
        //                 },

        //                 function (err) {
        //                     console.error(err);
        //                 });

        $state.go('login');
    };

    $scope.backToLogin = function() {
        $state.go('login');
    };
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
    $scope.userCourse='M.Tech';
    $scope.userSem='VII';
    $scope.userSession='July-Dec 2015';
    $scope.currentDay='Monday';

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
