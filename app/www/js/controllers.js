angular.module('iips-app.controllers', [])

.controller('AppCtrl', function($scope, $cordovaSplashscreen) {
    $cordovaSplashscreen.show();
    $setTimeout(function() {
        $cordovaSplashscreen.hide();
    }, 3000);
})

.controller('LoginCtrl', function($scope, $state) { 
    
    $scope.data = {};

    $scope.register = function() {
      $state.go('register');
    };
    $scope.login = function() {
        $state.go('tab');
    }

    $scope.forgot = function() {
        alert("How could you forget your password");
    }
})

.controller('RegisterCtrl', function($scope, $state) {

    $scope.register = function() {
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

.controller('DashCtrl', function($scope, $state, $rootScope, $ionicUser, $ionicPush, Subjects) {

    $scope.data = {};
    $scope.showQuote = true;

    setTimeout(function() {
        $scope.swipeCard();
    }, 1500);

    $scope.swipeCard = function() {
        $scope.showQuote = false;
    }

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

    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
        alert("Successfully registered token " + data.token);
        console.log('Ionic Push: Got token ', data.token, data.platform);
        $scope.token = data.token;
      });

    $scope.identifyUser = function() {
        console.log('Ionic User: Identifying with Ionic User service');

        var user = $ionicUser.get();
        if(!user.user_id) {
          // Set your user_id here, or generate a random one.
          user.user_id = $ionicUser.generateGUID();
        };

        // Add some metadata to your user object.
        angular.extend(user, {
          name: 'Ionitron',
          bio: 'I come from planet Ion'
        });

        // Identify your user with the Ionic User Service
        $ionicUser.identify(user).then(function(){
          $scope.identified = true;
          alert('Identified user ' + user.name + '\n ID ' + user.user_id);
        });
      };

    $scope.pushRegister = function() {
        console.log('Ionic Push: Registering user');

        // Register with the Ionic Push service.  All parameters are optional.
        $ionicPush.register({
          canShowAlert: true, //Can pushes show an alert on your screen?
          canSetBadge: true, //Can pushes update app icon badges?
          canPlaySound: true, //Can notifications play a sound?
          canRunActionsOnWake: true, //Can run actions outside the app,
          onNotification: function(notification) {
            // Handle new push notifications here
            // console.log(notification);
            return true;
          }
        });
      };

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
