angular.module('iips-app.services', [])

.factory('API', function($rootScope, $http, $ionicLoading, $window) {
	var base = "http://localhost:8080/api";

	$rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };
        $rootScope.hide = function () {
            $ionicLoading.hide();
        };
        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };
        $rootScope.setToken = function (token) {
            return $window.localStorage.token = token;
        }
        return {
        	userSignup: function(userForm) {
        		return $http.post(base+'/Users', userForm);
        	},
            studentSignup: function(studentForm) {
                return $http.post(base+'/Students', studentForm);
            }

        }
	// return $resource('http://localhost:8080/api/Users');
})
.factory('Auth', function($rootScope, $http, $ionicLoading, $window) {
    var base = "http://localhost:8080/auth";
    var auth = {};

    auth.saveToken = function (token){
      $window.localStorage['auth-token'] = token;
    };

    auth.getToken = function (){
      return $window.localStorage['auth-token'];
    }

    auth.isLoggedIn = function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };
    auth.login = function(loginForm) {
        return $http.post(base+'/login', loginForm);
    };

    auth.logOut = function(){
      $window.localStorage.removeItem('auth-token');
    };

    $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };
    $rootScope.hide = function () {
        $ionicLoading.hide();
    };
    $rootScope.notify =function(text){
        $rootScope.show(text);
        $window.setTimeout(function () {
          $rootScope.hide();
        }, 1999);
    };

    return auth;

})
.factory('Subjects', function() {

    var subjects = [{
        id: 708,
        name: 'Bio. info.',
        time: '10:00 AM'
    }, {
        id: 701,
        name: 'Comp. arch.',
        time: '11:00 AM'        
    }, {
        id: 703,
        name: 'Disc. str.',
        time: '12:00 AM'
    }];

    return {
        all: function() {
            return subjects;
        }
    };
})

.factory('ClassDetails', function() {

    var classDetails = [{
        name: 'Room No.',
        value: '201'
    }, {
        name: 'Department',
        value: 'Technical'
    }, {
        name: 'HOD',
        value: 'Unknown'
    }, {
        name: 'Program Incharge',
        value: 'Kirti Mathur'
    }, {
        name: 'Batch Mentor',
        value: 'Rajesh Verma'
    }];

    return {
        all: function() {
            return classDetails;
        }
    };
})
.factory('User', function() {

    var user = [{
        name: 'Course',
        value: 'M.Tech'
    }, {
        name: 'Sem',
        value: 'VII'
    }, {
        name: 'Email',
        value: 'jaiswalswati94@gmail.com'
    }];

    return {
        all: function() {
            return user;
        }
    };
});